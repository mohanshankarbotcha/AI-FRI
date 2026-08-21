import sys
from pathlib import Path
from fastapi.testclient import TestClient

backend_dir = Path(__file__).resolve().parent.parent / "backend"
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.main import app

client = TestClient(app)


def test_get_knowledge_graph_api():
    response = client.get("/api/knowledge")
    assert response.status_code == 200
    data = response.json()
    assert "nodes" in data
    assert "links" in data
    assert "stats" in data
    assert len(data["nodes"]) >= 5


def test_search_knowledge_api():
    response = client.get("/api/knowledge/search?q=python")
    assert response.status_code == 200
    data = response.json()
    assert data["total_results"] >= 1
    assert any("python" in n["title"].lower() or "python" in n["snippet"].lower() for n in data["results"])


def test_reindex_knowledge_api():
    response = client.post("/api/knowledge/reindex")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
