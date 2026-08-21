import sys
from pathlib import Path

backend_dir = Path(__file__).resolve().parent.parent / "backend"
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.knowledge.indexer import KnowledgeIndexer


def test_knowledge_indexer_run():
    indexer = KnowledgeIndexer()
    data = indexer.build_index()

    assert "nodes" in data
    assert "links" in data
    assert "stats" in data
    stats = data["stats"]
    assert stats["documents_indexed"] >= 5
    assert stats["relationships"] >= 8
    assert stats["unresolved_links"] >= 1
    assert stats["errors"] == 0
