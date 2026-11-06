"""MkDocs hook: give heading permalinks a descriptive accessible name.

The `toc` extension (permalink: true) appends a link to every heading
whose only text is the pilcrow sign:

    <a class="headerlink" href="#mig-overview" title="Permanent link">¶</a>

Screen readers and accessibility scanners take the link's name from
its text, so every one of these is announced as just "¶". The `toc`
extension has no option for an aria-label, so this hook adds one built
from the heading text, e.g. aria-label="Permanent link to MIG Overview".
The visible ¶ and the hover tooltip are unchanged.

Enabled through `hooks:` in mkdocs.yml.
"""

import re
from html import escape, unescape

_HEADING = re.compile(r"<(h[1-6])\b[^>]*>(.*?)</\1>", re.DOTALL)
_PERMALINK = re.compile(r'<a class="headerlink"[^>]*>.*?</a>', re.DOTALL)
_TAG = re.compile(r"<[^>]+>")
_MAX_TEXT = 100


def _label_permalink(match):
    heading = match.group(0)
    link = _PERMALINK.search(match.group(2))
    if link is None or "aria-label=" in link.group(0):
        return heading

    # Heading text without the permalink itself or any inline markup
    text = _PERMALINK.sub("", match.group(2))
    text = " ".join(unescape(_TAG.sub("", text)).split())
    # Scanners treat very long link names (>150 characters) as suspicious
    if len(text) > _MAX_TEXT:
        text = text[:_MAX_TEXT].rsplit(" ", 1)[0] + "…"
    label = f"Permanent link to {text}" if text else "Permanent link"

    labelled = link.group(0).replace(
        '<a class="headerlink"',
        f'<a class="headerlink" aria-label="{escape(label, quote=True)}"',
        1,
    )
    return heading.replace(link.group(0), labelled, 1)


def on_post_page(output, page, config):
    return _HEADING.sub(_label_permalink, output)
