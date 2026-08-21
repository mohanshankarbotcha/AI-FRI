from fastapi import APIRouter, HTTPException, Query
from app.knowledge.indexer import KnowledgeIndexer

router = APIRouter(prefix="/api/knowledge", tags=["Knowledge"])
indexer = KnowledgeIndexer()


@router.get("")
async def get_knowledge_graph():
    """Returns the full knowledge graph summary including nodes, links, and statistics."""
    data = indexer.load_index()
    return data


@router.get("/nodes/{node_id:path}")
async def get_knowledge_node(node_id: str):
    """Returns detailed information for a single node including outgoing links and incoming backlinks."""
    data = indexer.load_index()
    nodes = {n["id"]: n for n in data.get("nodes", [])}

    if node_id not in nodes:
        raise HTTPException(status_code=404, detail=f"Node '{node_id}' not found.")

    node = nodes[node_id]

    # Calculate outgoing links and incoming backlinks
    outgoing = [link for link in data.get("links", []) if link["source"] == node_id]
    backlinks = [link for link in data.get("links", []) if link["target"] == node_id]

    return {
        "node": node,
        "outgoing_links": outgoing,
        "backlinks": backlinks,
    }


@router.get("/search")
async def search_knowledge(q: str = Query(..., min_length=1)):
    """Searches knowledge notes by title, tags, category, or snippet text."""
    query = q.lower().strip()
    data = indexer.load_index()
    results = []

    for node in data.get("nodes", []):
        if (
            query in node["title"].lower()
            or query in node["snippet"].lower()
            or query in node["category"].lower()
            or any(query in t.lower() for t in node.get("tags", []))
        ):
            results.append(node)

    return {
        "query": q,
        "total_results": len(results),
        "results": results,
    }


@router.post("/reindex")
async def reindex_knowledge():
    """Triggers a complete rebuild of the knowledge index."""
    updated_data = indexer.build_index()
    return {
        "status": "success",
        "message": "Knowledge graph index rebuilt successfully.",
        "stats": updated_data["stats"],
    }
