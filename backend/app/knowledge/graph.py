import hashlib
from typing import Any


class KnowledgeGraphBuilder:
    """Builds a deterministic, machine-readable graph representation from parsed document metadata."""

    @staticmethod
    def generate_node_id(rel_path: str) -> str:
        """Generates a stable, deterministic node ID from relative file path."""
        clean_path = rel_path.lower().replace("\\", "/").strip()
        # Slugified prefix + short hash for collision safety
        slug = clean_path.replace(".md", "").replace("/", "-").replace("_", "-")
        path_hash = hashlib.sha256(clean_path.encode("utf-8")).hexdigest()[:8]
        return f"node:{slug}-{path_hash}"

    @classmethod
    def build_graph(cls, parsed_docs: list[dict[str, Any]]) -> dict[str, Any]:
        nodes: list[dict[str, Any]] = []
        links: list[dict[str, Any]] = []
        unresolved_references: list[dict[str, Any]] = []

        title_to_id: dict[str, str] = {}
        path_to_id: dict[str, str] = {}

        # First pass: Register nodes and build lookup maps
        for doc in parsed_docs:
            if "error" in doc:
                continue

            node_id = cls.generate_node_id(doc["rel_path"])
            doc["id"] = node_id

            # Register title and path mappings (case-insensitive)
            clean_title = doc["title"].lower().strip()
            title_to_id[clean_title] = node_id
            path_to_id[doc["rel_path"].lower()] = node_id
            # Also register stem as path lookup
            stem_path = doc["rel_path"].rsplit(".", 1)[0].lower()
            path_to_id[stem_path] = node_id

            nodes.append(
                {
                    "id": node_id,
                    "title": doc["title"],
                    "path": doc["rel_path"],
                    "category": doc["category"],
                    "tags": doc["tags"],
                    "snippet": doc["snippet"],
                    "frontmatter": doc["frontmatter"],
                }
            )

        # Second pass: Resolve relationships and track unresolved links
        for doc in parsed_docs:
            if "error" in doc:
                continue

            source_id = doc["id"]

            # Process Wikilinks
            for wlink in doc.get("wikilinks", []):
                target_str = wlink["target"]
                target_lower = target_str.lower().strip()

                target_id = title_to_id.get(target_lower) or path_to_id.get(
                    target_lower
                )

                if target_id:
                    links.append(
                        {
                            "source": source_id,
                            "target": target_id,
                            "type": "wikilink",
                            "alias": wlink.get("alias"),
                        }
                    )
                else:
                    unresolved_references.append(
                        {
                            "source_id": source_id,
                            "source_path": doc["rel_path"],
                            "target_title": target_str,
                            "alias": wlink.get("alias"),
                            "type": "wikilink",
                        }
                    )

            # Process explicit Markdown links
            for mdlink in doc.get("markdown_links", []):
                target_path = mdlink["target"].lower().strip()
                # Resolve relative path if needed
                resolved_id = path_to_id.get(target_path)

                if resolved_id:
                    links.append(
                        {
                            "source": source_id,
                            "target": resolved_id,
                            "type": "markdown_link",
                            "label": mdlink.get("label"),
                        }
                    )

        # Deduplicate links deterministically
        unique_links_dict = {}
        for link in links:
            key = (link["source"], link["target"], link["type"])
            if key not in unique_links_dict:
                unique_links_dict[key] = link
        unique_links = list(unique_links_dict.values())

        # Sort output lists deterministically by ID
        nodes.sort(key=lambda n: n["id"])
        unique_links.sort(key=lambda l: (l["source"], l["target"], l["type"]))

        stats = {
            "documents_indexed": len(nodes),
            "relationships": len(unique_links),
            "unresolved_links": len(unresolved_references),
            "categories_count": len({n["category"] for n in nodes}),
        }

        return {
            "nodes": nodes,
            "links": unique_links,
            "unresolved_references": unresolved_references,
            "stats": stats,
        }
