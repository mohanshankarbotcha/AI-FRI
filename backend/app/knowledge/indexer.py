import json
import sys
from pathlib import Path
from typing import Any

from app.config import settings
from app.knowledge.graph import KnowledgeGraphBuilder
from app.knowledge.parser import MarkdownParser


class KnowledgeIndexer:
    """Discovers, parses, builds, and persists the knowledge index graph."""

    def __init__(
        self, knowledge_dir: Path | None = None, index_file: Path | None = None
    ):
        self.knowledge_dir = knowledge_dir or settings.KNOWLEDGE_DIR
        self.index_file = index_file or settings.INDEX_FILE

    def discover_files(self) -> list[Path]:
        if not self.knowledge_dir.exists():
            self.knowledge_dir.mkdir(parents=True, exist_ok=True)
            return []
        return sorted([p for p in self.knowledge_dir.rglob("*.md") if p.is_file()])

    def build_index(self) -> dict[str, Any]:
        files = self.discover_files()
        parsed_docs = []
        errors = 0

        for file_path in files:
            doc = MarkdownParser.parse_file(file_path, self.knowledge_dir)
            if "error" in doc:
                errors += 1
            else:
                parsed_docs.append(doc)

        graph_data = KnowledgeGraphBuilder.build_graph(parsed_docs)
        graph_data["stats"]["files_discovered"] = len(files)
        graph_data["stats"]["errors"] = errors

        # Save index file deterministically
        self.index_file.parent.mkdir(parents=True, exist_ok=True)
        with open(self.index_file, "w", encoding="utf-8") as f:
            json.dump(graph_data, f, indent=2, ensure_ascii=False)

        return graph_data

    def load_index(self) -> dict[str, Any]:
        if not self.index_file.exists():
            return self.build_index()

        try:
            with open(self.index_file, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return self.build_index()


def run_cli():
    indexer = KnowledgeIndexer()
    print("Building FRIDAY Knowledge Index...")
    data = indexer.build_index()
    stats = data["stats"]

    print("\nFRIDAY KNOWLEDGE INDEX")
    print("---------------------------------")
    print(f"Files discovered:   {stats.get('files_discovered', 0)}")
    print(f"Documents indexed:  {stats.get('documents_indexed', 0)}")
    print(f"Relationships:      {stats.get('relationships', 0)}")
    print(f"Unresolved links:   {stats.get('unresolved_links', 0)}")
    print(f"Errors:             {stats.get('errors', 0)}")
    print("---------------------------------")
    print(f"Index persisted to: {indexer.index_file}\n")


if __name__ == "__main__":
    run_cli()
