# Current Issues — Change Record

---

## 2026-06-18 — Code Review Fixes

### Finding 1 — Fixed: Relative script paths in troubleshooting.md
**File:** `.agents/skills/prisma-compute/references/troubleshooting.md` (lines 230–231)
**Issue:** Smoke test commands used `node prisma-compute/scripts/smoke-deployed-app.mjs`, which assumes `.agents/skills/` as the working directory — undocumented and error-prone on fresh checkouts.
**Fix:** Updated both commands to use the full path from repository root:
```
node .agents/skills/prisma-compute/scripts/smoke-deployed-app.mjs
```

---

### Finding 2 — Fixed: Same relative path issue in app-deploy-cli.md
**File:** `.agents/skills/prisma-compute/references/app-deploy-cli.md` (line 162)
**Issue:** Same undocumented relative path assumption as above.
**Fix:** Updated to full path from repository root:
```
node .agents/skills/prisma-compute/scripts/smoke-deployed-app.mjs
```

---

### Finding 3 — Fixed: SKILL.md Preferred Workflow missing production deploy confirmation gate
**File:** `.agents/skills/prisma-compute/SKILL.md` (Preferred Workflow section, old step 6)
**Issue:** No active confirmation checkpoint before production deploys. The `deploy-prod-intent` rule in Quick Rules is passive and not enforced in the workflow itself.
**Fix:** Inserted a new step 6 requiring the agent to explicitly ask the user to confirm the target environment, branch, and env file before any `--prod` deploy. Old step 6 (smoke-test) became step 7.

---

### Finding 4 — Fixed: No `prisma generate` before build
**File:** `package.json` (scripts.build)
**Issue:** `app/generated/prisma` is gitignored, so the directory is absent on fresh clones. `lib/prisma.ts` imports `PrismaClient` from `../app/generated/prisma/client`, causing an immediate import failure without prior generation.
**Fix:** Prepended `prisma generate` to the build script:
```json
"build": "prisma generate && next build"
```

---

### Finding 5 — Skipped: Concurrent request guard in use-project-actions.ts
**File:** `hooks/use-project-actions.ts`
**Issue:** Report flagged `handleCreate`, `handleRename`, and `handleDelete` as missing a `useRef`-based in-flight lock to prevent concurrent API requests.
**Reason skipped:** File does not exist in the codebase. No action taken.
