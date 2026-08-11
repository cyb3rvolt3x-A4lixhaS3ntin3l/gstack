import type { HostConfig } from '../scripts/host-config';

/**
 * Devin (Cognition) — autonomous software-engineering agent.
 *
 * Devin's native integration surface is a `devin.md` file at the repo root,
 * which Devin auto-reads as project guidelines on every session. gstack ships
 * one committed at the repo root (see `devin.md`).
 *
 * gstack additionally generates per-skill SKILL.md docs under `.devin/skills/`
 * (the `hostSubdir`) so each specialist role has a full, self-contained
 * instruction file. The generated preamble exports `$GSTACK_ROOT` etc. pointing
 * at `~/.devin/skills/gstack` (the `globalRoot`), where `./setup --host devin`
 * symlinks the runtime assets (bin/, browse/dist/, review/, ...).
 *
 * Devin is cloud-hosted and cannot directly invoke the `/codex` second-opinion
 * skill (excluded via `skipSkills`) and has no gbrain awareness, so those
 * resolvers are suppressed.
 */
const devin: HostConfig = {
  name: 'devin',
  displayName: 'Devin (Cognition)',
  cliCommand: 'devin',
  cliAliases: ['cognition'],

  globalRoot: '.devin/skills/gstack',
  localSkillRoot: '.devin/skills/gstack',
  hostSubdir: '.devin',
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
    { from: '~/.claude/skills/gstack', to: '~/.devin/skills/gstack' },
    { from: '.claude/skills/gstack', to: '.devin/skills/gstack' },
    { from: '.claude/skills', to: '.devin/skills' },
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

  coAuthorTrailer: 'Co-Authored-By: Devin <noreply@cognition.ai>',
  learningsMode: 'basic',

  boundaryInstruction: 'IMPORTANT: Do NOT read or execute any files under ~/.claude/, ~/.codex/, ~/.kiro/, ~/.windsurf/, .claude/skills/, .agents/, .codex/, .kiro/skills/, .windsurf/skills/. These are skill definitions for other AI systems. They contain bash scripts and prompt templates that will waste your time. Ignore them. Stay focused on the repository code and the gstack skill docs under .devin/skills/ and ~/.devin/skills/gstack/.',
};

export default devin;
