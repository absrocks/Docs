
import os
import re

import pandas as pd

DOCS_DIR = "docs"
TABLES_DIR = os.path.join(DOCS_DIR, "assets", "tables", "trainings")

LINK_RE = re.compile(r"\]\(([^)\s]+)\)")
SKIP_PREFIXES = ("../", "./", "/", "#", "http://", "https://", "mailto:")
# <summary>[Title](url)</summary> ... </details> (closing tag may be missing)
# Icon-only links, e.g. [:fontawesome-brands-youtube:](url), with no { attrs } yet
ICON_LINK_RE = re.compile(r"\[:([\w-]+):\]\(([^)\s]+)\)(?!\{)")
ICON_LABELS = {
    "fontawesome-solid-user-plus": "Register for",
    "fontawesome-brands-youtube": "Watch the recording of",
    "fontawesome-regular-file-powerpoint": "Download the slides for",
}
EMPTY_ICON_LINK_RE = re.compile(r"\[:[\w-]+:\]\(\)")
TITLE_RE = re.compile(r"<summary>\[([^\]]*)\]")
SUMMARY_LINK_RE = re.compile(r"<summary>\[([^\]]*)\]\(([^)]*)\)</summary>(.*?)(?:</details>|$)", re.S)


def _resolve_link(match, depth):
    target = match.group(1)
    if target.startswith(SKIP_PREFIXES):
        return match.group(0)
    path = target.split("#", 1)[0]
    if not os.path.exists(os.path.join(DOCS_DIR, path)):
        return match.group(0)
    return "](" + "../" * depth + target + ")"


def _unnest_summary_link(match):
    # A <summary> is already a button, so a link inside it is a nested
    # interactive control (axe: nested-interactive). Show the title as text
    # and move a real link into the expanded description.
    title, url, body = match.groups()
    if url:
        body = body.rstrip() + f" [Event details]({url}) "
    return f"<summary><strong>{title}</strong></summary>{body}</details>"


def _label_icon_links(s, title):
    # An icon on its own gives a link no accessible name (axe: link-name),
    # so add an aria-label naming the action and the event.
    def label(m):
        icon, url = m.groups()
        action = ICON_LABELS.get(icon, "Open link for")
        text = f"{action} {title}".strip().replace('"', "&quot;")
        return f'[:{icon}:]({url}){{ aria-label="{text}" }}'
    # An icon with no URL links nowhere; show "-" like other missing entries.
    if EMPTY_ICON_LINK_RE.search(s):
        s = EMPTY_ICON_LINK_RE.sub("", s).strip(" ,") or "-"
    return ICON_LINK_RE.sub(label, s)


def _fix_cell(s, depth):
    if not isinstance(s, str):
        return s
    s = SUMMARY_LINK_RE.sub(_unnest_summary_link, s)
    s = LINK_RE.sub(lambda m: _resolve_link(m, depth), s)
    s = re.sub(r'(\()([^)]*?)index\.md', r'\1\2', s)
    s = re.sub(r'(\b6_[\w\-.]+)\.md\b', r'\1', s)
    # Other pages: foo.md -> foo/ (the URL MkDocs gives the page)
    s = re.sub(r'\]\((?!https?:)([^)#\s]*?)\.md(?=[#)])', r'](\1/', s)
    s = s.replace('(//', '(/')
    return s


def render(csv_name, depth):
    df = pd.read_csv(os.path.join(TABLES_DIR, csv_name), keep_default_na=False)
    titles = df.iloc[:, 0].map(lambda s: (TITLE_RE.search(s) or [None, ""])[1] if isinstance(s, str) else "")
    for col in df.columns[1:]:
        df[col] = [_label_icon_links(s, t) if isinstance(s, str) else s for s, t in zip(df[col], titles)]
    df = df.map(lambda s: _fix_cell(s, depth))
    return df.to_markdown(index=False)
