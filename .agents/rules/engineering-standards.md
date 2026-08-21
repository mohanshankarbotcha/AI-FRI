# Rule: Engineering Standards

## Architecture & Modularity
- Maintain clear physical and logical boundaries between `frontend`, `backend`, `knowledge`, `memory`, `tests`, and `scripts`.
- Avoid cross-domain leakages (e.g., UI rendering logic mixed with data retrieval or backend persistence).
- Design all components so that future extensions (e.g., knowledge graph, vector indexing, voice I/O) can be integrated modularly without refactoring the foundational architecture.

## Dependency Discipline
- Keep dependencies minimal and audit third-party packages for security and maintenance status before introduction.
- Do not install heavy SDKs or frameworks until the specific development level requiring them is activated.
- Pin dependency versions explicitly in package manifests when dependencies are introduced.

## Code Style & Quality
- Write clear, self-documenting code with concise inline commentary where non-obvious logic exists.
- Enforce strict typing or schema definitions for cross-module data structures.
- Follow standard formatting conventions for the language in use (e.g., Prettier, Black, ESLint).
