# Rule: Testing & Verification

## Pre-Commit Verification Requirements
Before declaring any task or development iteration complete, agents must:
1. Verify that directory structures, config files, and file references are valid and intact.
2. Run any project linters, type checks, or static analysis tools configured for the workspace.
3. Execute relevant automated unit or integration test suites located in `tests/`.
4. Check `git status` to ensure no stray, temporary, or unvetted files are committed.

## Quality & Coverage Standards
- New features and bug fixes must be accompanied by corresponding verification tests in `tests/`.
- Tests must execute deterministically without relying on unmocked external network endpoints or hardcoded environment paths.
- Never delete or comment out failing tests to force a green status; resolve the root cause of test failures.
