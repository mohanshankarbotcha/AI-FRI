# FRIDAY-AI Development Roadmap

> **Current Milestone**: Level 0 Complete

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

### Level 1: Core Engine & Data Storage Baseline (PLANNED)
- [ ] Establish backend application runtime environment (Python / TypeScript baseline).
- [ ] Implement local file ingestion engine in `knowledge/`.
- [ ] Define initial SQLite / local storage schemas for document metadata and memory tags.
- [ ] Set up basic CLI or REST API interface endpoints.
- [ ] Add unit test harness in `tests/`.

---

### Level 2: Knowledge Ingestion & Retrieval (PLANNED)
- [ ] Text chunking, tokenization, and embedding generation.
- [ ] Local vector store integration.
- [ ] Grounded RAG query pipeline with citation tracking.
- [ ] Memory capture interface ("Remember that...").

---

### Level 3: Interactive UI & Knowledge Graph (PLANNED)
- [ ] Web frontend interface for chat and knowledge management.
- [ ] 3D graph visualizer for exploring node relationships.
- [ ] Source provenance overlay for grounded answers.

---

### Level 4: Voice, Multi-Modal & Controlled Tools (PLANNED)
- [ ] Speech-to-text (STT) and text-to-speech (TTS) integration.
- [ ] Assistant personality engine.
- [ ] Controlled tool execution interface with user permission prompts.
- [ ] Security hardening and integration tests.
