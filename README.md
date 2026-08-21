# FRIDAY-AI

FRIDAY-AI is a long-term personal AI intelligence and knowledge-assistant system. It is designed to combine personal knowledge storage, a visual knowledge graph, grounded AI question-answering, source and provenance visualization, voice input/output, a consistent assistant personality, explicit memory capture, and controlled tool/agent executions.

> [!NOTE]
> **Original System**: FRIDAY-AI is an original engineering system and does not copy any product's implementation, proprietary assets, or branding.

---

## Current Status: Level 0 — Engineering Foundation

FRIDAY-AI is currently at **Level 0 (Engineering Foundation)**.

### What is IMPLEMENTED at Level 0:
- Repository directory structure and governance framework.
- Core project governance (`AGENTS.md`).
- Workspace agent rules (`.agents/rules/`).
- Security architecture baseline (`docs/security/`).
- Initial documentation, roadmap, and ADR-0001 (`docs/`).
- Git tracking configuration (`.gitignore`).

### What is PLANNED (Not Yet Implemented):
- AI / LLM orchestration and chat interface
- RAG and knowledge retrieval engines
- Vector embeddings and vector databases
- 3D visual knowledge graph visualization
- Voice input / speech-to-text / text-to-speech engines
- Memory capture & persistence pipelines
- Autonomous agent execution framework and external tool integrations

---

## Project Structure

```
c:\Users\user\OneDrive\Desktop\AI\
├── .agents/
│   └── rules/                  # Workspace rules (engineering, security, verification, docs, agent behavior)
├── docs/
│   ├── architecture/           # High-level system architecture and component designs (PLANNED)
│   ├── decisions/              # Architecture Decision Records (ADR-0001)
│   ├── roadmap/                # Level 0 through future milestone roadmap
│   └── security/               # Security foundation principles and guidelines
├── frontend/                   # User interface layer (PLANNED)
├── backend/                    # Core service and orchestration engines (PLANNED)
├── knowledge/                  # Document ingestion and knowledge storage (PLANNED)
├── memory/                     # User memory store and conversation state (PLANNED)
├── tests/                      # Automated unit and integration test suites (PLANNED)
├── scripts/                    # Development, build, and utility scripts (PLANNED)
├── .gitignore                  # Git exclusion rules
├── AGENTS.md                   # Agent identity, principles, and rules
└── README.md                   # System overview and entry point
```

---

## Development Philosophy

1. **Modular & Extensible**: Components are strictly decoupled so future modules (e.g. 3D visualization, speech, memory) integrate cleanly.
2. **Secure by Default**: Zero secrets in source code, strict filesystem scoping, input validation, and explicit execution boundaries.
3. **Honest Engineering**: Clear demarcation between what is implemented and what is planned; no fake or mock functional stubs.
