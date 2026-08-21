# FRIDAY-AI System Architecture Overview

> **Implementation State**: **PLANNED**  
> *Note: This document describes the planned target architecture for FRIDAY-AI across future development levels. Only the Level 0 Engineering Foundation is currently implemented.*

---

## Conceptual Pipeline

FRIDAY-AI is structured around a 6-stage operational pipeline:

```
[ Knowledge ] ──> [ Retrieval ] ──> [ Intelligence ] ──> [ Interaction ]
                                           │                   │
                                           ▼                   ▼
                                      [ Memory ]         [ Tools ]
```

### 1. Knowledge Layer (`knowledge/`) — *PLANNED*
- Local document ingestion (Markdown, PDF, text, web bookmarks).
- Parsing, chunking, and structural metadata extraction.
- Graph relationships and vector index building.

### 2. Retrieval Layer (`backend/retrieval`) — *PLANNED*
- Hybrid search (keyword + semantic vector embedding).
- Graph traversals for context enrichment.
- Grounding context retrieval with source attribution.

### 3. Intelligence Layer (`backend/intelligence`) — *PLANNED*
- LLM inference orchestration and prompt formulation.
- Fact verification and source citation assembly.
- Reasoning loops for complex queries.

### 4. Interaction Layer (`frontend/`) — *PLANNED*
- Web UI / Desktop interface.
- 3D visual knowledge graph visualization (galaxy/nodes view).
- Multi-modal interaction (voice I/O + text).

### 5. Memory Layer (`memory/`) — *PLANNED*
- Short-term conversation history management.
- Long-term memory extraction and user profile store.
- Restricted write permissions to prevent unvetted memory mutations.

### 6. Tools Layer (`backend/tools`) — *PLANNED*
- Controlled action execution (file export, local system tasks, external API integrations).
- Explicit permission prompts and input schema validation.

---

## Candidate Technologies (Planned Evaluation)

The following candidates will be evaluated in subsequent levels:
- **Backend / API**: Python (FastAPI / Typer) or Node.js / TypeScript.
- **Frontend / UI**: React / Vite / Next.js with Three.js / WebGL for 3D knowledge visualizer.
- **Vector Storage**: Local vector store (e.g. Qdrant / Chroma / LanceDB).
- **Speech Processing**: Whisper / local STT and high-quality TTS engines.
- **Graph Storage**: SQLite / NetworkX / Kùzu for local graph relationships.
