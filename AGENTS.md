# Project Governance & Agent Rules - FRIDAY-AI

## Identity
- **Project**: FRIDAY-AI
- **Purpose**: A personal AI intelligence and knowledge system built for long-term personal knowledge storage, visual graph exploration, grounded AI question-answering, source provenance visualization, voice interaction, consistent assistant personality, explicit memory capture, and controlled tool/agent executions.

## Engineering Principles
- **Modular Architecture**: Systems must be built as independent, loosely-coupled modules with clear interface boundaries.
- **Separation of Concerns**: Frontend, backend, knowledge storage, memory management, and execution engines must remain distinctly separated.
- **Secure-by-Default Design**: Security controls, input validation, execution sandboxing, and credential safety must be built into all components from day one.
- **Test-Driven Verification**: Features and refactors must include verification strategies and automated tests where practical.
- **Minimal Unnecessary Dependencies**: Avoid introducing heavy libraries, frameworks, or dependencies without clear justification.
- **Explicit Interfaces**: All module inter-communications must use well-defined, typed, or schema-validated contracts.
- **Maintainability & Observability**: Code must be readable, well-documented, structured cleanly, and log execution states deterministically.
- **Deterministic Behavior & Graceful Error Handling**: Fallbacks must be clean and explicit; system states should be predictable.
- **Accessibility & Performance Awareness**: User interfaces must be responsive, accessible, and performant.

## AI Agent Rules
All future Antigravity agents operating in this workspace must strictly adhere to the following directives:

1. **Inspect Before Editing**: Always inspect workspace context, existing file structure, current git state, and existing rule definitions before making edits.
2. **Preserve Working Functionality**: Do not break, delete, or rewrite existing functional code unless explicitly directed or refactoring under approved plans.
3. **Avoid Unnecessary Rewrites**: Favor incremental, targeted updates over whole-file replacements or speculative redesigns.
4. **Explain Architectural Changes**: Provide clear rationale and documentation updates whenever changing module boundaries or component interfaces.
5. **Run Verification & Tests**: Run applicable linter checks, build scripts, and test suites after making changes.
6. **Verify Builds**: Ensure configurations compile/parse cleanly and dependencies resolve without error before declaring work done.
7. **No Fake or Placeholder Implementations**: Never create stubbed functions, mock APIs, or empty components that mimic functionality to pretend work is finished.
8. **No Secrets or Credentials**: Never hardcode API keys, tokens, passwords, or private data in source code, documentation, or commits. Use environment configuration.
9. **No Unconfirmed Destructive Actions**: Do not delete major directories, reset git history, or drop database states without explicit user confirmation.
10. **Maintain Documentation Integrity**: Keep `README.md`, architectural records (`docs/architecture/`), roadmaps, and security guidelines up to date alongside code modifications.
11. **Honest Reporting**: Never claim a feature or test passed if it was not actually built or run.
