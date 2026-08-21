# Security Foundation & Policy

## 1. Zero Secrets in Source Code
- API credentials, private keys, database passwords, and auth tokens must **never** be committed to Git or stored in source code.
- All dynamic configuration must be injected via standard environment variables or local `.env` files.
- `.env` files and secret configs must be listed in `.gitignore`.

## 2. Execution Boundaries & System Access
- **No Unrestricted Shell Execution**: User inputs must not be passed to dynamic shell processes without explicit whitelist validation.
- **Filesystem Scoping**: File creation and modification operations must be restricted to designated workspace locations (e.g. `knowledge/`, `memory/`).
- **Tool Permission Boundaries**: Future agent tools must require explicit permission confirmation before reading sensitive user directories or invoking external network calls.

## 3. Data Integrity & Input Validation
- All external document ingestion pipelines must parse and sanitize inputs before storing metadata or building indices.
- Memory write operations must validate schema structure before saving entries into `memory/`.

## 4. Privacy & Local Control
- FRIDAY-AI is designed with local data privacy as a primary principle.
- Ingested documents, personal memory records, and graph databases remain under the user's local control.
