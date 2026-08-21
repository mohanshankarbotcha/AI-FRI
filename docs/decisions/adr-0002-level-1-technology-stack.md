# ADR-0002: Level 1 Application Shell & Technology Stack Selection

## Status
**Accepted**

## Date
2026-08-21

## Context
FRIDAY Level 1 requires establishing the core application shell, frontend visual identity, backend service runtime, health API endpoints, and centralized API communication layer.

## Decision
1. **Frontend**: Next.js 14+ (React 18, TypeScript) with custom dark mode styling (`Inter` + `Fira Code` monospace typography).
2. **Backend**: Python 3.10+ with FastAPI and Pydantic Settings for type-safe environment configuration.
3. **API Communication**: Centralized API abstraction in `frontend/src/lib/api.ts` so components do not hardcode backend URLs.
4. **Health Monitoring**: `GET /health` and `GET /api/health` providing service name, status, version, and environment.

## Consequences
- Clean separation between Next.js UI shell and Python FastAPI backend engine.
- Establishes a dark technical visual identity without heavy external UI dependencies.
- Facilitates modular addition of `/api/knowledge`, `/api/memory`, and future endpoints without restructuring.
