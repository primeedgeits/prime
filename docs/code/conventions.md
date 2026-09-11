# Coding Conventions

> **Status:** Draft · **Updated:** 2026-09-11

## Code style

TBD per language once the tech stack is chosen. Record the formatter and linter for each repository here, so every session formats code the same way.

## Git workflow

Suggested; not yet agreed:

- `main` always builds and works.
- Do larger changes on a branch, then merge into `main`.
- Write commit messages as a short command: "Add CAN reader", "Fix reconnect delay".

## Documentation rules (Decided)

- Every page starts with a status line: Idea, Draft or Decided.
- Write TBD for unknowns; never invent specifications.
- Record significant choices in [Decision Records](decisions.md).
- Add a [Development Log](dev-log.md) entry at the end of every work session.
- When code changes a behaviour described in these docs, update the docs in the same session.
