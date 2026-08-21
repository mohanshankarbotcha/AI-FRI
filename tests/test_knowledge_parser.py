import sys
from pathlib import Path

backend_dir = Path(__file__).resolve().parent.parent / "backend"
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.knowledge.parser import MarkdownParser


def test_markdown_parser_wikilinks_and_title():
    text = """---
title: Custom Title
category: testing
tags: [test, demo]
---

# Heading 1 Should Not Override Frontmatter

This is a test with [[Target Note]] and [[Target Note 2|Alias Label]].
Also explicit markdown link [FastAPI Note](fastapi.md).
"""
    parsed = MarkdownParser.parse_text(text, rel_path="testing/sample.md")
    assert parsed["title"] == "Custom Title"
    assert parsed["category"] == "testing"
    assert "test" in parsed["tags"]
    assert len(parsed["wikilinks"]) == 2
    assert parsed["wikilinks"][0]["target"] == "Target Note"
    assert parsed["wikilinks"][1]["alias"] == "Alias Label"
    assert len(parsed["markdown_links"]) == 1
    assert parsed["markdown_links"][0]["target"] == "fastapi.md"


def test_markdown_parser_heading_fallback():
    text = """# Machine Learning Title

No frontmatter here, but [[Deep Learning]] link exists.
"""
    parsed = MarkdownParser.parse_text(text, rel_path="ai/ml.md")
    assert parsed["title"] == "Machine Learning Title"
    assert parsed["category"] == "ai"
    assert len(parsed["wikilinks"]) == 1
