#!/usr/bin/env node
/*
 * Accessibility check for the built documentation site.
 *
 * Usage:  node .github/scripts/a11y-check.cjs <site-dir>
 * Needs:  npm install --no-save axe-core playwright
 *         npx playwright install chromium
 *
 */
'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');
const { chromium } = require('playwright');

const SITE = path.resolve(process.argv[2] || 'site');
const REPORT = process.env.A11Y_REPORT || 'a11y-report.json';
const SKIP = (process.env.A11Y_SKIP ?? 'archived').split(',').map((s) => s.trim()).filter(Boolean);
const WORKERS = 4;
const MAX_LISTED = 20; // findings listed per rule in the summary; the JSON report has all
const VIEWPORTS = [
  { name: 'desktop', width: 1350, height: 940 },
  { name: 'phone', width: 390, height: 844 },
];
// WCAG 2.1 A/AA. WCAG 2.2 (tag wcag22aa) is left out: its only axe-core rule,
// target-size, reports several hundred small inline links on this site.
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

const AXE_SOURCE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const AXE_VERSION = require('axe-core/package.json').version;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.pdf': 'application/pdf',
};

/* ---------- pages to scan: every folder of the site with an index.html ---------- */

function findPages(root) {
  const pages = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (dir === root && (SKIP.includes(entry.name) || entry.name.startsWith('.'))) continue;
        walk(full);
      } else if (entry.name === 'index.html') {
        const rel = path.relative(root, dir).split(path.sep).join('/');
        pages.push(rel ? `${rel}/` : '');
      }
    }
  })(root);
  return pages.sort();
}

/* ---------- tiny static file server for the built site ---------- */

function serve(root) {
  const server = http.createServer((req, res) => {
    let rel;
    try {
      rel = decodeURIComponent(req.url.split(/[?#]/)[0]);
    } catch {
      res.writeHead(400).end();
      return;
    }
    let file = path.join(root, rel);
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404).end();
        return;
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
      res.end(data);
    });
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

/* ---------- runs inside the page ---------- */

async function scanPage(tags) {
  /* global axe, document */
  const found = [];
  const snippet = (el) => el.outerHTML.replace(/\s+/g, ' ').slice(0, 220);

  // 1. axe-core
  const result = await axe.run(document, {
    runOnly: { type: 'tag', values: tags },
    resultTypes: ['violations'],
    iframes: false,
  });
  for (const violation of result.violations) {
    for (const node of violation.nodes) {
      found.push({
        rule: violation.id,
        help: violation.help,
        helpUrl: violation.helpUrl,
        tags: violation.tags,
        target: node.target.join(' '),
        html: node.html.replace(/\s+/g, ' ').slice(0, 220),
        detail: (node.failureSummary || '').split('\n').slice(1).map((s) => s.trim()).filter(Boolean).join('; ').slice(0, 300),
      });
    }
  }

  // 2. checks that imitate Level Access rules
  axe.setup();
  try {
    const exposed = (el) => axe.commons.dom.isVisibleToScreenReaders(el);
    const add = (rule, level, help, el, detail) =>
      found.push({ rule, level, help, target: axe.utils.getSelector(el), html: snippet(el), detail });

    // Level Access rule 123: SVG element missing accessible name
    const controls =
      'a, button, meter, [role="button"], [role="checkbox"], [role="img"], [role="menuitemcheckbox"], ' +
      '[role="menuitemradio"], [role="meter"], [role="option"], [role="progressbar"], [role="radio"], ' +
      '[role="scrollbar"], [role="separator"], [role="slider"], [role="switch"], [role="tab"]';
    for (const svg of document.querySelectorAll('svg')) {
      if (svg.hasAttribute('role') || svg.closest(controls) || !exposed(svg)) continue;
      const named =
        (svg.getAttribute('aria-label') || '').trim() ||
        svg.hasAttribute('aria-labelledby') ||
        [...svg.children].some((c) => c.tagName.toLowerCase() === 'title' && c.textContent.trim());
      if (!named) {
        add('svg-accessible-name', 'error', 'SVG images must have an accessible name or be hidden from assistive technology', svg,
          'Add aria-hidden="true" if the icon is decorative, or role="img" with an aria-label if it carries meaning');
      }
    }

    // Level Access rule: Link has suspicious accessible name
    const generic = /^(click here|here|link|this link|this|this page|read more|learn more|more|details)$/i;
    for (const link of document.querySelectorAll('a[href]')) {
      if (!exposed(link)) continue;
      const name = axe.commons.text.accessibleText(link).replace(/\s+/g, ' ').trim();
      if (!name) continue; // reported by axe-core's own link-name rule
      if (name.length > 150) {
        add('link-name-suspicious', 'error', 'Links must have a name that describes their purpose', link,
          `The link's name is ${name.length} characters long (the limit is 150)`);
      } else if (!/[\p{L}\p{N}]/u.test(name)) {
        add('link-name-suspicious', 'error', 'Links must have a name that describes their purpose', link,
          `The link's name is only a symbol: "${name}"`);
      } else if (generic.test(name)) {
        add('link-name-generic', 'warning', 'Link names should describe where the link goes', link,
          `The link's name is "${name}"`);
      } else if (name.length <= 3 && !/^\d+$/.test(name)) {
        add('link-name-short', 'warning', 'Very short link names may be flagged as lacking purpose', link,
          `The link's name is "${name}"`);
      }
    }

    // Level Access rule: aria-expanded used where it is not allowed.
    // ARIA 1.2 allows it only on these roles (and the roles that inherit from
    // them). axe-core still accepts it on nav/region, following ARIA 1.1.
    const expandable = new Set([
      'application', 'button', 'checkbox', 'columnheader', 'combobox', 'gridcell', 'link', 'listbox',
      'menuitem', 'menuitemcheckbox', 'menuitemradio', 'row', 'rowheader', 'switch', 'tab', 'treeitem',
    ]);
    for (const el of document.querySelectorAll('[aria-expanded]')) {
      if (!exposed(el)) continue;
      const role = axe.commons.aria.getRole(el);
      if (!expandable.has(role)) {
        add('aria-expanded-not-allowed', 'error', 'aria-expanded is only allowed on elements that open or close something', el,
          role ? `The element's role is "${role}"` : 'The element has no role');
      }
    }
  } finally {
    axe.teardown();
  }
  return found;
}

/* ---------- scan every page at every width ---------- */

async function scanSite(pages, origin) {
  const findings = new Map(); // one entry per rule + page + element
  const record = (page, viewport, f) => {
    const key = `${f.rule}|${page}|${f.target}`;
    if (!findings.has(key)) {
      const level = f.level || (f.tags.some((t) => WCAG_TAGS.includes(t)) ? 'error' : 'warning');
      findings.set(key, { rule: f.rule, level, help: f.help, helpUrl: f.helpUrl || null, page, target: f.target, html: f.html, detail: f.detail, viewports: [] });
    }
    findings.get(key).viewports.push(viewport);
  };

  const browser = await chromium.launch();
  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        colorScheme: 'light',
        reducedMotion: 'reduce',
      });
      await context.route((url) => url.origin !== origin, (route) => route.abort());

      let next = 0;
      const worker = async () => {
        const tab = await context.newPage();
        while (next < pages.length) {
          const page = pages[next++];
          try {
            await tab.goto(`${origin}/${page}`, { waitUntil: 'load', timeout: 30000 });
            await tab.waitForTimeout(250); // let the theme's scripts finish
            // Finish any fade/slide at once, so colours are not measured mid-animation
            await tab.addStyleTag({ content: '*, *::before, *::after { transition: none !important; animation: none !important; }' });
            await tab.addScriptTag({ content: AXE_SOURCE });
            for (const f of await tab.evaluate(scanPage, [...WCAG_TAGS, 'best-practice'])) record(page, viewport.name, f);
          } catch (err) {
            record(page, viewport.name, {
              rule: 'page-not-scanned', level: 'error', help: 'The page could not be opened or scanned',
              target: '', html: '', detail: String(err.message || err).split('\n')[0].slice(0, 300),
            });
          }
        }
        await tab.close();
      };
      await Promise.all(Array.from({ length: WORKERS }, worker));
      await context.close();
    }
  } finally {
    await browser.close();
  }
  return [...findings.values()];
}

/* ---------- reporting ---------- */

function groupByRule(findings) {
  const groups = new Map();
  for (const f of findings) {
    if (!groups.has(f.rule)) groups.set(f.rule, { rule: f.rule, help: f.help, helpUrl: f.helpUrl, items: [] });
    groups.get(f.rule).items.push(f);
  }
  return [...groups.values()]
    .map((g) => ({ ...g, pages: new Set(g.items.map((i) => i.page)).size }))
    .sort((a, b) => b.items.length - a.items.length);
}

const pageName = (p) => `/${p}`;
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\|/g, '&#124;');

function textReport(title, groups) {
  const lines = [];
  for (const g of groups) {
    lines.push('', `${title}: ${g.rule} - ${g.help}`, `  ${plural(g.items.length, 'element')} on ${plural(g.pages, 'page')}`);
    for (const f of g.items.slice(0, MAX_LISTED)) {
      lines.push(`  ${pageName(f.page)} [${f.viewports.join(', ')}]  ${f.target}`);
      if (f.detail) lines.push(`      ${f.detail}`);
      if (f.html) lines.push(`      ${f.html}`);
    }
    if (g.items.length > MAX_LISTED) lines.push(`  ...and ${g.items.length - MAX_LISTED} more (see ${REPORT})`);
  }
  return lines;
}

function markdownSection(heading, groups) {
  if (!groups.length) return [];
  const md = ['', `### ${heading}`, '', '| Rule | What it means | Elements | Pages |', '|---|---|---:|---:|'];
  for (const g of groups) {
    const rule = g.helpUrl ? `[${g.rule}](${g.helpUrl})` : g.rule;
    md.push(`| ${rule} | ${esc(g.help)} | ${g.items.length} | ${g.pages} |`);
  }
  for (const g of groups) {
    md.push('', `<details><summary><b>${g.rule}</b>: ${plural(g.items.length, 'element')} on ${plural(g.pages, 'page')}</summary>`, '', '<ul>');
    for (const f of g.items.slice(0, MAX_LISTED)) {
      md.push(
        `<li><code>${esc(pageName(f.page))}</code> (${f.viewports.join(', ')})` +
        (f.target ? ` at <code>${esc(f.target)}</code>` : '') +
        (f.detail ? `<br>${esc(f.detail)}` : '') +
        (f.html ? `<br><code>${esc(f.html)}</code>` : '') + '</li>');
    }
    if (g.items.length > MAX_LISTED) md.push(`<li>...and ${g.items.length - MAX_LISTED} more in the <code>${esc(REPORT)}</code> artifact</li>`);
    md.push('</ul>', '</details>');
  }
  return md;
}

async function main() {
  if (!fs.existsSync(path.join(SITE, 'index.html'))) {
    console.error(`No built site found at ${SITE} (expected an index.html there).`);
    process.exit(2);
  }
  const pages = findPages(SITE);
  const server = await serve(SITE);
  const origin = `http://127.0.0.1:${server.address().port}`;
  const widths = VIEWPORTS.map((v) => `${v.name} (${v.width}px)`).join(' and ');
  console.log(`Scanning ${plural(pages.length, 'page')} from ${SITE} at ${widths} with axe-core ${AXE_VERSION}`);

  let findings;
  try {
    findings = await scanSite(pages, origin);
  } finally {
    server.close();
  }

  const errors = groupByRule(findings.filter((f) => f.level === 'error'));
  const warnings = groupByRule(findings.filter((f) => f.level === 'warning'));
  const errorCount = errors.reduce((n, g) => n + g.items.length, 0);
  const warningCount = warnings.reduce((n, g) => n + g.items.length, 0);
  const errorPages = new Set(findings.filter((f) => f.level === 'error').map((f) => f.page)).size;
  const verdict = errorCount
    ? `${plural(errorCount, 'accessibility problem')} on ${plural(errorPages, 'page')}`
    : 'No WCAG 2.1 A/AA accessibility problems found';

  fs.writeFileSync(REPORT, JSON.stringify({
    scanned: { pages: pages.length, viewports: VIEWPORTS, axeCore: AXE_VERSION, skipped: SKIP },
    problems: errorCount, warnings: warningCount, findings,
  }, null, 2));

  console.log([...textReport('PROBLEM', errors), ...textReport('WARNING', warnings)].join('\n'));
  console.log(`\n${verdict}. ${plural(warningCount, 'warning')}. Full report: ${REPORT}`);

  if (process.env.GITHUB_STEP_SUMMARY) {
    const md = [
      '## Accessibility check', '',
      `${errorCount ? '❌' : '✅'} **${verdict}.** ${plural(warningCount, 'warning')}.`, '',
      `Scanned ${plural(pages.length, 'page')} at ${widths} with axe-core ${AXE_VERSION}, light colour scheme` +
      (SKIP.length ? `, skipping \`${SKIP.join('`, `')}\`.` : '.'),
      ...markdownSection('Problems (these fail the check)', errors),
      ...markdownSection('Warnings (these do not fail the check)', warnings),
    ];
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md.join('\n') + '\n');
  }
  if (errorCount && process.env.GITHUB_ACTIONS) console.log(`::error title=Accessibility check::${verdict}`);
  process.exit(errorCount ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
