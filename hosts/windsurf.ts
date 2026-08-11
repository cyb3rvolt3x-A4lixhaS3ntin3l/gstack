import type { HostConfig } from '../scripts/host-config';

/**
 * Windsurf (Codeium) — Cascade AI agent.
 *
 * Windsurf's native integration surfaces are:
 *   - `.windsurfrules` (repo root) — classic Cascade rules file, auto-read by
 *     the Cascade agent on every session. Shipped committed (see repo root).
 *   - `.windsurf/rules/*.md` — newer per-project "Rules" cascade files.
 *
 * gstack additionally generates per-skill SKILL.md docs under `.windsurf/skills/`
 * (the `hostSubdir`) so each specialist role has a full, self-contained
 * instruction file. The generated preamble exports `$GSTACK_ROOT` etc. pointing
 * at `~/.windsurf/skills/gstack` (the `globalRoot`), where `./setup --host
 * windsurf` symlinks the runtime assets (bin/, browse/dist/, review/, ...).
 *
 * Windsurf is not Claude Code: it cannot invoke the `/codex` second-opinion
 * skill (already excluded via `skipSkills`) and has no gbrain awareness, so
 * those resolvers are suppressed.
 */
const windsurf: HostConfig = {
  name: 'windsurf',
  displayName: 'Windsurf',
  cliCommand: 'windsurf',
  cliAliases: ['codeium'],

  globalRoot: '.windsurf/skills/gstack',
  localSkillRoot: '.windsurf/skills/gstack',
  hostSubdir: '.windsurf',
  usesEnvVars: true,

  frontmatter: {
    mode: 'allowlist',
    keepFields: ['name', 'description'],
    descriptionLimit: null,
  },

  generation: {
    generateMetadata: false,
    skipSkills: ['codex'],
  },

  pathRewrites: [
    { from: '~/.claude/skills/gstack', to: '~/.windsurf/skills/gstack' },
    { from: '.claude/skills/gstack', to: '.windsurf/skills/gstack' },
    { from: '.claude/skills', to: '.windsurf/skills' },
  ],

  suppressedResolvers: ['GBRAIN_CONTEXT_LOAD', 'GBRAIN_SAVE_RESULTS'],

  runtimeRoot: {
    globalSymlinks: ['bin', 'browse/dist', 'browse/bin', 'gstack-upgrade', 'ETHOS.md'],
    globalFiles: {
      'review': ['checklist.md', 'TODOS-format.md'],
    },
  },

  install: {
    prefixable: false,
    linkingStrategy: 'symlink-generated',
  },

  coAuthorTrailer: 'Co-Authored-By: Windsurf Cascade <noreply@codeium.com>',
  learningsMode: 'basic',

  boundaryInstruction: 'IMPORTANT: Do NOT read or execute any files under ~/.claude/, ~/.codex/, ~/.kiro/, .claude/skills/, .agents/, .codex/, .kiro/skills/. These are skill definitions for other AI systems. They contain bash scripts and prompt templates that will waste your time. Ignore them. Stay focused on the repository code and the gstack skill docs under .windsurf/skills/ and ~/.windsurf/skills/gstack/.',
};

export default windsurf;
