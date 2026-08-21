# Rule: Security Foundation & Data Protection

## Credential & Secret Management
- **Zero Secrets in Source**: Never hardcode API keys, access tokens, credentials, or private configuration in code or documentation.
- **Environment Configuration**: Load secrets exclusively via standard environment variables or secure local configuration files that are explicitly excluded by `.gitignore`.
- **No Mock Keys**: Do not generate or write fake API keys into tracked files.

## Execution & Filesystem Boundaries
- **Restricted Filesystem Access**: File operations must be strictly scoped to designated application directories (e.g. storage within `knowledge/` and `memory/`).
- **No Arbitrary Shell Execution**: Future end-user inputs must never be directly evaluated or passed into shell command execution interfaces.
- **Explicit Tool Permissions**: Any tool integrations in future levels must operate under explicit permission boundaries and input schema validation.

## Memory & Input Validation
- **Input Sanitization**: Validate and sanitize all external inputs, file uploads, and user queries before processing.
- **Memory Write Scoping**: Future state/memory persistence operations must strictly write only to designated paths inside `memory/`.
