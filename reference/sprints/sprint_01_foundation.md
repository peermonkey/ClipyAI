# Sprint 01 – Foundation & DevOps (Week 1)

## Goal
Set up the engineering runway so subsequent sprints can focus on product code rather than tooling. Establish CI/CD, quality gates, and a predictable local-dev story.

## Key Outcomes
* Monorepo builds from scratch in <3 min (local) and <5 min (CI)
* `pnpm dev` spins up web, api, worker in one command
* Lint & type-check must pass for all packages
* Main branch auto-deploys to Sevalla without manual steps

## Dependencies
None – greenfield.

## Team & Hours
DevOps (1) • Backend (1) • Front-end (1)  
Estimated effort: 30 story points.

## Acceptance Criteria
- [ ] Running `npm run build` succeeds on CI.  
- [ ] New repo clone + `npm i` + `pnpm dev` yields no errors.  
- [ ] Storybook accessible at http://localhost:6006 with default Button.

- [ ] Initialise Turborepo & workspaces  
  Why: Single-source build graph for all packages.  
  Inputs→Outputs: turbo.json + root package.json → committed.
- [ ] Configure TypeScript strict settings  
  Why: Prevent runtime bugs; enforce null safety.  
  Inputs→Outputs: tsconfig.json strict=true.
- [ ] Add Nixpacks build config  
  Why: Enable zero-config deploy on Sevalla.  
  Inputs→Outputs: nixpacks.toml in root.
- [ ] Setup GitHub Actions CI  
  Why: Automatic lint/test/build on push; gate merges.  
  Inputs→Outputs: .github/workflows/ci.yml with npm cache.
- [ ] Implement shared ESLint + Prettier config  
  Why: Ensure code consistency across services.  
  Inputs→Outputs: packages/eslint-config + lint passing.
- [ ] Create Secret management docs & .env.example  
  Why: Onboard devs, avoid leaked secrets.  
  Inputs→Outputs: reference/.env.example + Security section link.
- [ ] Write repository structure README  
  Why: Contributor guidance.  
  Inputs→Outputs: Updated root README sections: Structure, Dev, Deploy.
- [ ] Bootstrap Storybook workspace  
  Why: Visual regression tests for UI components.  
  Inputs→Outputs: packages/ui Storybook with default Button story.

## Key File Targets
* `package.json`, `turbo.json`, `tsconfig.json`, `nixpacks.toml`
* `.github/workflows/ci.yml`
* `packages/eslint-config/` (+ index.js, package.json)
* `reference/.env.example`
* `packages/ui/.storybook/` 