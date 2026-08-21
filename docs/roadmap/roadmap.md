# FRIDAY Development Roadmap

> **Current Milestone**: Level 2 Complete

---

## Milestone Schedule

### Level 0: Engineering Foundation (COMPLETED)
- [x] Establish directory structure (`frontend`, `backend`, `knowledge`, `memory`, `tests`, `scripts`).
- [x] Establish project governance (`AGENTS.md`).
- [x] Enforce workspace agent rules (`.agents/rules/`).
- [x] Define security baseline and data boundaries (`docs/security/`).
- [x] Create foundational documentation, architecture overview, and ADR-0001.
- [x] Configure Git tracking (`.gitignore`) and local repository initialization.

---

### Level 1: Application Shell & Health Infrastructure (COMPLETED)
- [x] Establish Next.js 14 frontend application shell (`frontend/`).
- [x] Establish dark technical visual identity (cyan/emerald accents, typography).
- [x] Establish FastAPI backend engine (`backend/app/main.py`).
- [x] Implement health check endpoints (`GET /health` & `GET /api/health`).
- [x] Implement centralized API Client abstraction (`frontend/src/lib/api.ts`).
- [x] Configure Pydantic settings & CORS handling.
- [x] Add status panel UI component (`StatusPanel.tsx`).

---

### Level 2: Knowledge Engine (COMPLETED)
- [x] Create Markdown parser (frontmatter, title resolution, tags, category).
- [x] Implement wikilinks (`[[Note]]`) and Markdown link extraction.
- [x] Implement unresolved links tracker (`[[Nonexistent]]`).
- [x] Implement stable node ID generator (`node:<slug>-<hash>`).
- [x] Build deterministic Knowledge Graph builder & JSON indexer (`knowledge/index.json`).
- [x] Build CLI indexer script (`scripts/index_knowledge.py`).
- [x] Expose Knowledge REST APIs (`GET /api/knowledge`, `/nodes/:id`, `/search`, `POST /reindex`).
- [x] Create Development Knowledge Inspector UI (`KnowledgeInspector.tsx`).
- [x] Write automated Pytest test suite for health API, parser, indexer, and knowledge APIs (`tests/`).

---

### Level 3: Semantic Retrieval & Vector Indexing (PLANNED)
- [ ] Local text embeddings generation & vector store integration.
- [ ] Hybrid keyword + semantic search.
- [ ] Grounded RAG context builder with citation tracking.

---

### Level 4: 3D Galaxy Graph, Voice & Memory (PLANNED)
- [ ] 3D WebGL / Three.js galaxy visualizer for knowledge nodes.
- [ ] Voice STT / TTS interaction engine.
- [ ] Assistant personality engine.
- [ ] Memory capture store (`memory/`).
- [ ] Controlled tool execution framework.
