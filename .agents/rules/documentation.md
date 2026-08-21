# Rule: Documentation Standards

## Planned vs. Implemented Discipline
- **Strict Distinction**: Documentation must clearly distinguish between features that are currently **IMPLEMENTED** vs. those that are **PLANNED** for future levels.
- **No False Claims**: Never document a capability, API endpoint, or component as active or functional if it has not yet been built and verified.

## Synchronous Documentation Updates
- Update `README.md` when high-level system scope or development level state changes.
- Update `docs/architecture/` whenever system architecture, data flow, or module boundaries evolve.
- Document architectural decisions by creating standard Architecture Decision Records (ADRs) under `docs/decisions/`.
- Maintain `docs/security/` when security principles or execution boundaries are updated.
