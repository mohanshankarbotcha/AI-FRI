# FRIDAY

FRIDAY is a long-term personal AI intelligence and knowledge-assistant system. It combines local knowledge storage, relationship-aware graph indexing, grounded question-answering, voice interaction, assistant personality, memory capture, and controlled tool execution.

> [!NOTE]
> **Original System**: FRIDAY is an original engineering system and does not copy any product's implementation, proprietary assets, or branding.

---

## Current Development Status: Level 2 — Knowledge Engine Active

FRIDAY is currently at **Level 2 (Knowledge Engine)**.

### What is IMPLEMENTED (Level 0, 1 & 2):
- **Level 0**: Repository structure, workspace governance (`AGENTS.md`), rules (`.agents/rules/`), security foundation, Git tracking (`.gitignore`).
- **Level 1**: Next.js 14 frontend control shell, dark technical visual identity, FastAPI backend engine, health endpoint (`GET /health`), CORS, Pydantic settings, and centralized API client abstraction.
- **Level 2**: Markdown knowledge engine, YAML frontmatter parser, title resolution, `[[wikilinks]]` parsing, explicit Markdown links, stable node ID generation, unresolved references tracker, deterministic JSON knowledge graph indexer (`knowledge/index.json`), CLI indexer script (`scripts/index_knowledge.py`), knowledge REST APIs (`GET /api/knowledge`, `GET /api/knowledge/nodes/:id`, `GET /api/knowledge/search`, `POST /api/knowledge/reindex`), and Development Knowledge Inspector UI.

### What is PLANNED (Future Levels):
- AI / LLM orchestration and chat interface
- Semantic embeddings and vector database retrieval
- 3D visual galaxy knowledge graph visualization
- Speech recognition (STT) and speech synthesis (TTS)
- User memory capture and long-term state persistence
- Autonomous agent execution framework and external tool integrations

---

## Quick Start & Running Locally

### 1. Requirements
- Python 3.10+
- Node.js 18+ & npm

### 2. Backend Setup & Execution
```bash
# Navigate to repository root
pip install -r backend/requirements.txt

# Run knowledge indexer CLI
python scripts/index_knowledge.py

# Start FastAPI backend server (runs on http://127.0.0.1:8000)
python -m backend.app.main
```

### 3. Frontend Setup & Execution
```bash
# Navigate to frontend directory
cd frontend
npm install

# Start Next.js development server (runs on http://localhost:3000)
npm run dev
```

### 4. Running Backend Unit Tests
```bash
# From repository root
pytest tests/
```

---

## System Architecture & Components

```
c:\Users\user\OneDrive\Desktop\AI\
├── .agents/                    # Workspace agent rules & engineering standards
├── docs/                       # Architecture docs, roadmap, ADRs, security policies
├── backend/                    # Python FastAPI application engine & knowledge parser
│   ├── app/
│   │   ├── knowledge/         # Parser, graph builder, and deterministic indexer
│   │   ├── routers/           # Health (/health) and Knowledge REST APIs (/api/knowledge)
│   │   ├── config.py          # Environment settings (Pydantic Settings)
│   │   └── main.py            # FastAPI entrypoint
│   └── requirements.txt
├── frontend/                   # Next.js 14 application control center
│   ├── src/
│   │   ├── app/               # Next.js layout, page, and global dark CSS theme
│   │   ├── components/        # StatusPanel and KnowledgeInspector debug components
│   │   └── lib/api.ts         # Centralized API client abstraction
├── knowledge/                  # Local Markdown knowledge notes directory & index.json
├── scripts/                    # index_knowledge.py CLI script
├── tests/                      # Automated unit and API test harness (Pytest)
├── .gitignore
├── AGENTS.md                   # Project governance directives
└── README.md                   # System documentation
```
