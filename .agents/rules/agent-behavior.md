# Rule: AI Agent Behavior & Ethics

## Inspect Before Action
- Always inspect workspace files, configuration files, and existing git status before proposing or applying modifications.
- Check existing `.agents/rules/` to ensure full compliance with active project guidelines.

## Implementation Integrity
- **No Stubs or Fake Code**: Do not write mock implementations, hardcoded placeholder data, or fake UI components designed to mimic real functionality.
- **No Unconfirmed Destructive Actions**: Never remove existing source files, re-initialize git repositories, or delete data structures without explicit user instruction.
- **Transparent Progress Reports**: Accurately report what was inspected, created, modified, verified, or left unresolved in execution reports.
