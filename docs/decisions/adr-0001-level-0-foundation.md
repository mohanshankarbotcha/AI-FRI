# ADR-0001: Level 0 Engineering Foundation & Directory Structure

## Status
**Accepted**

## Date
2026-08-21

## Context
FRIDAY-AI requires a scalable, clean, secure-by-default engineering baseline to support long-term development across multiple levels (knowledge storage, vector retrieval, visual 3D graph, voice I/O, personality, memory capture, and agent tool execution) without requiring structural rewrites as development progresses.

## Decision
1. **Modular Directory Structure**: Established isolated directories for `frontend`, `backend`, `knowledge`, `memory`, `tests`, and `scripts`.
2. **Persistent Agent Governance**: Created `AGENTS.md` at the project root to enforce engineering principles and agent behavioral rules across all future Antigravity agent interactions.
3. **Scoped Workspace Rules**: Created focused rule files under `.agents/rules/` for engineering standards, security, testing/verification, documentation, and agent behavior.
4. **Strict Scope Demarcation**: All future components are explicitly marked as **PLANNED** in documentation (`README.md`, `docs/architecture/`, `docs/roadmap/`). No placeholder or mock code is implemented at Level 0.
5. **Git Policy**: Initialized local Git repository with a `.gitignore` excluding environment files, secrets, dependency paths, build artifacts, and IDE caches.

## Consequences
- Clean separation between components prevents architectural coupling.
- Future AI agents working on this codebase will automatically follow the persistent guidelines set in `AGENTS.md` and `.agents/rules/`.
- Repositories remain secure and free of hardcoded credentials from inception.
