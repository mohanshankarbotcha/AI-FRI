import re
from pathlib import Path
from typing import Any
import yaml


class MarkdownParser:
    """Parses Markdown files for title, frontmatter metadata, wikilinks, and explicit markdown links."""

    WIKILINK_REGEX = re.compile(r"\[\[([^\]\|]+)(?:\|([^\]]+))?\]\]")
    MD_LINK_REGEX = re.compile(r"\[([^\]]+)\]\(([^)]+\.md)\)")
    H1_REGEX = re.compile(r"^#\s+(.+)$", re.MULTILINE)

    @classmethod
    def parse_file(cls, file_path: Path, relative_to: Path) -> dict[str, Any]:
        try:
            content = file_path.read_text(encoding="utf-8", errors="replace")
        except Exception as e:
            return {
                "error": f"Failed to read file: {e}",
                "path": str(file_path.relative_to(relative_to)).replace("\\", "/"),
            }

        return cls.parse_text(
            content=content,
            rel_path=str(file_path.relative_to(relative_to)).replace("\\", "/"),
        )

    @classmethod
    def parse_text(cls, content: str, rel_path: str) -> dict[str, Any]:
        frontmatter: dict[str, Any] = {}
        body = content

        # 1. Frontmatter extraction
        if content.startswith("---"):
            parts = content.split("---", 2)
            if len(parts) >= 3:
                try:
                    parsed_fm = yaml.safe_load(parts[1])
                    if isinstance(parsed_fm, dict):
                        # Convert date/datetime objects to ISO string format
                        def sanitize_dict(d):
                            clean = {}
                            for k, v in d.items():
                                if hasattr(v, "isoformat"):
                                    clean[k] = v.isoformat()
                                elif isinstance(v, dict):
                                    clean[k] = sanitize_dict(v)
                                elif isinstance(v, list):
                                    clean[k] = [x.isoformat() if hasattr(x, "isoformat") else x for x in v]
                                else:
                                    clean[k] = v
                            return clean
                        frontmatter = sanitize_dict(parsed_fm)
                    body = parts[2]
                except Exception:
                    pass  # Keep frontmatter empty if malformed

        # 2. Title resolution: frontmatter title -> H1 -> filename fallback
        title = frontmatter.get("title")
        if not title:
            h1_match = cls.H1_REGEX.search(body)
            if h1_match:
                title = h1_match.group(1).strip()
            else:
                filename = Path(rel_path).stem
                title = filename.replace("-", " ").replace("_", " ").title()

        # 3. Category & Tags resolution
        category = frontmatter.get("category")
        if not category and "/" in rel_path:
            category = rel_path.split("/")[0]
        elif not category:
            category = "general"

        tags = frontmatter.get("tags", [])
        if isinstance(tags, str):
            tags = [t.strip() for t in tags.split(",")]
        elif not isinstance(tags, list):
            tags = []

        # 4. Wikilink extraction: [[Target Note]] or [[Target Note|Label]]
        wikilinks = []
        for match in cls.WIKILINK_REGEX.finditer(body):
            target = match.group(1).strip()
            alias = match.group(2).strip() if match.group(2) else None
            wikilinks.append({"target": target, "alias": alias})

        # 5. Explicit Markdown link extraction
        markdown_links = []
        for match in cls.MD_LINK_REGEX.finditer(body):
            label = match.group(1).strip()
            link_target = match.group(2).strip()
            markdown_links.append({"label": label, "target": link_target})

        # Clean snippet preview
        clean_body = re.sub(r"#+ ", "", body)
        snippet = clean_body.strip()[:250] + ("..." if len(clean_body) > 250 else "")

        return {
            "rel_path": rel_path,
            "title": title,
            "category": str(category),
            "tags": tags,
            "frontmatter": frontmatter,
            "body": body,
            "snippet": snippet,
            "wikilinks": wikilinks,
            "markdown_links": markdown_links,
        }
