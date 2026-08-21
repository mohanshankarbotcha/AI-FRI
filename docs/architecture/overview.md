# FRIDAY System Architecture Overview

> **Current Implementation State**: **Level 1 (Application Shell & Health API) & Level 2 (Knowledge Engine)** are **IMPLEMENTED**.  
> *Future levels (Vector Embeddings, 3D Galaxy Graph, LLM Engine, Voice, Memory, Tools) remain PLANNED.*

---

## Architecture Pipeline

```
[ Knowledge Engine ] ──> [ Knowledge APIs ] ──> [ Control Center UI ] ──> [ Status Panel ]
    (IMPLEMENTED)             (IMPLEMENTED)           (IMPLEMENTED)           (IMPLEMENTED)
          │
          ▼
 [ Graph Indexer ]
    (IMPLEMENTED)
```

### 1. Knowledge Layer (`knowledge/` & `backend/app/knowledge/`) — **IMPLEMENTED**
- Markdown parser with YAML frontmatter, title extraction, tags, and category sorting.
- Wikilinks parsing (`[[Target Note]]` & `[[Target Note|Alias]]`) and explicit Markdown link detection.
- Unresolved references tracking (`[[Nonexistent Note]]`).
- Deterministic graph builder & stable node ID generation (`node:<slug>-<hash>`).
- CLI indexer script (`scripts/index_knowledge.py`) producing `knowledge/index.json`.

### 2. Service & API Layer (`backend/app/`) — **IMPLEMENTED**
- Python 3.10+ & FastAPI runtime.
- Environment settings via Pydantic Settings (`backend/app/config.py`).
- Health API (`GET /health` & `GET /api/health`).
- Knowledge REST endpoints (`GET /api/knowledge`, `GET /api/knowledge/nodes/:id`, `GET /api/knowledge/search`, `POST /api/knowledge/reindex`).
- CORS middleware & logging foundation.

### 3. Frontend Interface Layer (`frontend/`) — **IMPLEMENTED**
- Next.js 14 (React 18, TypeScript) application shell.
- Centralized API Client abstraction (`frontend/src/lib/api.ts`).
- Original FRIDAY visual identity: dark background, cyan/emerald glow accents, technical typography.
- Control center page (`frontend/src/app/page.tsx`).
- `StatusPanel` component monitoring engine health.
- `KnowledgeInspector` component providing a development graph debugger (stats, nodes table, relationships, unresolved links, and detail preview).

### 4. Intelligence & Retrieval Layers — *PLANNED*
- Vector database embedding indexing & semantic search.
- LLM inference orchestration and prompt formulation.

### 5. Interaction & Memory Layers — *PLANNED*
- 3D visual knowledge graph visualization (galaxy/nodes view).
- Voice STT / TTS engine.
- Persistent user memory capture and store (`memory/`).
- Autonomous tool execution framework.
