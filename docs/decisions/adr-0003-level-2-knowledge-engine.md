# ADR-0003: Level 2 Knowledge Engine Architecture & Indexer

## Status
**Accepted**

## Date
2026-08-21

## Context
FRIDAY Level 2 requires transforming raw Markdown notes in `knowledge/` into a structured, searchable, relationship-aware graph representation (nodes, links, unresolved references).

## Decision
1. **Markdown Parsing**: Extract title via frontmatter `title` -> first `# H1` -> filename fallback. Extract tags, categories, frontmatter metadata, `[[wikilinks]]`, and `[markdown links](path.md)`.
2. **Stable Node IDs**: Deterministic node ID generation using `node:<slug>-<hash>` based on relative path.
3. **Relationship Resolution**: Link nodes by matching target titles/paths. Unresolved `[[links]]` are recorded in `unresolved_references` without creating fake stub nodes.
4. **Deterministic JSON Graph**: Index exported to `knowledge/index.json` with deterministic ordering for stable diffs.
5. **CLI & REST API**: Indexer executable via `python scripts/index_knowledge.py` or REST endpoint `POST /api/knowledge/reindex`.

## Consequences
- Fast local-first graph indexing without heavy database dependencies at Level 2.
- Deterministic behavior ensures consistent output across test and production environments.
- Clean development inspector UI allows inspection of graph stats, nodes, relationships, and unresolved links.
