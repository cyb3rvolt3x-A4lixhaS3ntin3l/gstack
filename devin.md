# gstack for Devin (Cognition)

> gstack is Garry Tan's open-source "software factory" — 23 specialist roles
> (CEO reviewer, eng manager, designer, QA lead, release engineer, security
> officer, …) plus power tools, all as Markdown skills. This file tells Devin
> how to use those roles when working in this repository.

Devin reads this `devin.md` automatically as project guidelines. Treat the
gstack roles below as the methodology for any non-trivial change in this repo.

## Setup (one time, on the machine Devin drives)

```bash
# requires: git, Bun (https://bun.sh), Node.js
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.devin/skills/gstack
cd ~/.devin/skills/gstack && ./setup --host devin
```

This installs gstack's Devin skill docs into `~/.devin/skills/` and symlinks the
runtime assets (`bin/`, `browse/dist/`, `review/`, …) into
`~/.devin/skills/gstack/` so generated skill preambles can resolve
`$GSTACK_ROOT`, `$GSTACK_BIN`, `$GSTACK_BROWSE`.

To commit the skill docs into **this** repo for the whole team:

```bash
~/.devin/skills/gstack/bin/gstack-team-init required
git add .devin/ AGENTS.md && git commit -m "require gstack for AI-assisted work"
```

## How to use gstack from Devin

Each role is a self-contained instruction file at
`~/.devin/skills/gstack-<role>/SKILL.md` (or `.devin/skills/gstack-<role>/SKILL.md`
in this repo). Read the relevant file and follow it.

| When the user asks | Read & follow |
|--------------------|---------------|
| "Plan this feature" | `gstack-office-hours` then `gstack-autoplan` (CEO → design → eng → DX review) |
| "Review this branch" | `gstack-review` (finds bugs that pass CI but break in prod) |
| "QA the staging URL" | `gstack-qa` (opens a real Chromium browser, finds + fixes bugs) |
| "Ship this branch" | `gstack-ship` (test → review → push → PR) |
| "Security audit" | `gstack-cso` (OWASP Top 10 + STRIDE) |
| "Investigate this bug" | `gstack-investigate` (root-cause first, no blind fixes) |
| "Lock edits to src/" | `gstack-freeze` / `gstack-guard` |
| "Document what shipped" | `gstack-document-release` |

Full catalog: see `AGENTS.md` (cross-agent).

## Workflow Devin must follow in this repo

1. **Plan before code.** Run `gstack-office-hours` → `gstack-autoplan`. Save the
   plan to a file; do NOT implement until the user approves.
2. **Implement.** Write the code. Use `gstack-careful`/`gstack-freeze` to scope
   edits when the task must not touch other directories.
3. **Review.** `gstack-review` before landing — adversarial, production-bug focus.
4. **QA.** `gstack-qa` against the staging URL when the change is user-visible.
5. **Ship.** `gstack-ship` opens a PR; `gstack-land-and-deploy` merges, waits for
   CI + deploy, verifies production health.

## Conventions Devin must follow

- gstack skills are **generated** Markdown — read them, don't edit them. Edit
  the `.tmpl` sources and run `bun run gen:skill-docs --host devin`.
- The browse binary provides headless browser access. Inside a skill, use
  `$B <command>` (the preamble exports `$B`).
- State paths resolve via `bin/gstack-paths` (honor `GSTACK_HOME`).
- Safety skills (`careful`, `freeze`, `guard`) are advisory — **always confirm
  with the user before destructive operations** (rm -rf, DROP TABLE,
  force-push, deletions).
- Stay focused on repository code. Do NOT read or execute skill definitions
  installed for other AI systems under `~/.claude/`, `~/.codex/`, `~/.kiro/`,
  `~/.windsurf/`, `.agents/`, `.claude/skills/` — they are not meant for Devin
  and will waste your time. Your gstack docs live under `~/.devin/skills/` and
  `.devin/skills/`.

## Upgrade

```bash
~/.devin/skills/gstack/bin/gstack-upgrade   # or re-run ./setup --host devin
```
