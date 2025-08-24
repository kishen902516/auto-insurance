# 4) Backend Modules (NestJS)

1. **Auth & Session** — Passwordless (magic link) post-price; JWT access/refresh; roles: `customer`, `support`, `adjuster`, `admin` (OIDC for ops).
2. **Quote** — Entities: `QuoteSession`, `Driver`, `Vehicle`, `CoverageSelection`. NCD/valuation calls, rating math, price breakdown (Base − **NCD** + Add-ons + **SST 8%** + fees).
3. **Policy** — Bind, endorsements, docs (Dec page, **e-Cover Note**), **JPJ submission** with async status.
4. **Payments** — PSP abstraction (FPX, DuitNow/QR, cards); signed webhooks; idempotent capture; double-entry ledger.
5. **Integrations** — Adapters: **NCD/Valuation**, **JPJ**, **e-KYC**, **Email/SMS**, **Address**; retries, DLQ, circuit breakers.
6. **Claims** — FNOL intake, media, third parties, **OD-KFK** eligibility, panel workshop flag.
7. **Notifications** — Locale-aware templates (EN/BM) for email/SMS.

---
