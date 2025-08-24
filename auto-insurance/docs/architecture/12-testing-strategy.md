# 12) Testing Strategy

- **Unit:** rating math, NCD/tax math, validators, adapter mocks.
- **Contract:** FE↔BE (OpenAPI), BE↔vendors (pacts/snapshots).
- **E2E:** quote→bind→JPJ happy path; error/retry paths; keyboard-only a11y.
- **Load:** sustain p95 < 300ms at **500 RPS** on rate endpoint with ≥95% cache hit.
- **Chaos:** simulate outages (JPJ/NCD/PSP); feature-flagged fallbacks.
- **Security:** SAST/DAST, dep scanning, OWASP checks.

---
