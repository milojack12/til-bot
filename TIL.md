# Today I Learned — 2026-02-18

> Auto-generated from 2 memory files
> Period: 2026-02-11 to 2026-02-18

## 📊 Stats

- Total learnings: 7
- 🔧 1
- ❌ 5
- ✨ 1

---

## 🔧 Tech Patterns

- **Build Fix for `site` repository completed:** The `build_fixer_agent` successfully resolved the TypeScript build error in `MdxOverrides.tsx` by correctly implementing conditional rendering for image components in `ImgWithCaption` and `DoubleImg`. The changes were committed ('Fix: Resolve Image prop type errors in MdxOverrides') and pushed to the `fix/update-next-mdx-remote-v2` branch. The build now passes.

## ❌ Mistakes & Lessons

- **Sub-agent for Build Fixes (`fix_build_errors_v2`) failed:** Encountered API rate limit, leaving the `TypeError` and `VercelPostgresError` unresolved. Further attempts may require addressing rate limits or retrying after a delay.
- **Car Rental Search Interruption:** Browser instance reported `tab not found`, preventing direct website interaction for rental bookings. Browser connection needs to be re-established.
- **Review Comments:** Addressed comments on PR #71 for `MdxOverrides.tsx`. Could not action `drizzle/db.ts` review comment due to inability to identify the specific change to revert.
- **NVIDIA Model Configuration:** Attempted to configure the NVIDIA model by patching OpenClaw config for `baseUrl` and default agent model. Encountered an 'invalid config' error. Gateway restart is disabled.
- **NVIDIA Model Test:** Test with NVIDIA model failed with a 404 error, indicating a potential issue with the API endpoint.

## ✨ Wins

- **Build Fix for `site` repository completed:** The `build_fixer_agent` successfully resolved the TypeScript build error in `MdxOverrides.tsx` by correctly implementing conditional rendering for image components in `ImgWithCaption` and `DoubleImg`. The changes were committed ('Fix: Resolve Image prop type errors in MdxOverrides') and pushed to the `fix/update-next-mdx-remote-v2` branch. The build now passes.

---

**Sources:** 2026-02-16.md, 2026-02-17.md
**Generated:** 2026-02-18T16:30:44.718Z
