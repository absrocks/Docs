"""MkDocs hook: accessibility fixes for HTML the theme generates.

1. Heading permalinks get a descriptive accessible name.

   The `toc` extension (permalink: true) appends a link to every heading
   whose only text is the pilcrow sign:

       <a class="headerlink" href="#mig-overview" title="Permanent link">¶</a>

   Screen readers and accessibility scanners take the link's name from
   its text, so every one of these is announced as just "¶". The `toc`
   extension has no option for anything better, so this hook rewrites
   the link's content:

       <a class="headerlink" href="#mig-overview" title="Permanent link">
         <span aria-hidden="true">¶</span>
         <span class="md-sr-only">Permanent link to MIG Overview</span>
       </a>

   The ¶ stays visible but is left out of the accessible name, which is
   taken from the visually hidden text (.md-sr-only in extra.css). An
   aria-label is deliberately not used: scanners then check that the
   visible text "¶" appears in the label (WCAG 2.5.3, Label in Name).

2. The drawer overlay is hidden from assistive technology.

   Material's base.html has `<label class="md-overlay" for="__drawer">`,
   the click-to-close backdrop behind the mobile navigation drawer. It
   has no text, so scanners report an empty label. It is pointer-only
   (the menu button in the header is the keyboard control), so it gets
   aria-hidden="true". It is not inside a template block, so it cannot
   be changed through a theme override.

Enabled through `hooks:` in mkdocs.yml.
"""

import re
from html import escape, unescape

_HEADING = re.compile(r"<(h[1-6])\b[^>]*>(.*?)</\1>", re.DOTALL)
_PERMALINK = re.compile(r'(<a class="headerlink"[^>]*>)(.*?)(</a>)', re.DOTALL)
_TAG = re.compile(r"<[^>]+>")
_MAX_TEXT = 100

_OVERLAY = '<label class="md-overlay" for="__drawer">'
_OVERLAY_HIDDEN = '<label class="md-overlay" for="__drawer" aria-hidden="true">'


def _label_permalink(match):
    heading = match.group(0)
    link = _PERMALINK.search(match.group(2))
    if link is None or "md-sr-only" in link.group(2):
        return heading

    # Heading text without the permalink itself or any inline markup
    text = _PERMALINK.sub("", match.group(2))
    text = " ".join(unescape(_TAG.sub("", text)).split())
    # Scanners treat very long link names (>150 characters) as suspicious
    if len(text) > _MAX_TEXT:
        text = text[:_MAX_TEXT].rsplit(" ", 1)[0] + "…"
    label = f"Permanent link to {text}" if text else "Permanent link"

    symbol = link.group(2).strip()
    labelled = (
        f'{link.group(1)}<span aria-hidden="true">{symbol}</span>'
        f'<span class="md-sr-only">{escape(label)}</span>{link.group(3)}'
    )
    return heading.replace(link.group(0), labelled, 1)


def on_post_page(output, page, config):
    output = _HEADING.sub(_label_permalink, output)
    return output.replace(_OVERLAY, _OVERLAY_HIDDEN, 1)


def on_post_template(output_content, template_name, config):
    # Pages rendered straight from a template (404.html) skip on_post_page
    return output_content.replace(_OVERLAY, _OVERLAY_HIDDEN, 1)
