# Malaysia Motor Insurance — Architecture Doc v1.0

**Status:** Draft • **Owner:** Architect (BMad) • **Date:** 16 Aug 2025 • **Scope:** Quote → Bind → Pay → Docs/JPJ → Self-Service → FNOL

---

## Revision History

| Version | Date        | Author    | Notes                                 |
| ------- | ----------- | --------- | ------------------------------------- |
| 1.0     | 16 Aug 2025 | Architect | Initial architecture for MY Motor MVP |

---

## 1) Goals & Non-Goals

**Goals**

- Ship a **fast, reliable** D2C motor insurance app for Malaysia with Lemonade-style onboarding.
- Integrate **NCD lookup**, **vehicle valuation**, **e-Cover Note/JPJ eINSURANS**, **FPX/DuitNow/cards**, **e-KYC**.
- Protect PII; align with **BNM** and **PDPA**; meet SLOs.

**Non-Goals (MVP)**

- Multi-country, agent/broker portal, deep telematics/fraud ML, workshop network management.

**SLO targets**

- p95 **page load < 2.5s** (FE), p95 **core API < 300ms**, **99.5%** availability.
- **RPO ≤ 24h**, **RTO ≤ 4h**.

---

## 2) Reference Architecture (Logical)

```
[Browser]
   ↓ HTTPS
[Next.js Frontend (Vercel)]
   ↕ REST/GraphQL (fetch)
[API Gateway (NestJS)]
   ├─ Auth & Session
   ├─ Quote            ───→ [Rating Engine (in-proc)]
   ├─ Policy           ───→ [Docs Service (PDF)]
   ├─ Payments         ───→ [PSP Adapter: FPX/DuitNow/Cards]
   ├─ Integrations     ─┬─→ [NCD/Valuation (ISM/MyCarInfo)]
   │                    ├─→ [JPJ eINSURANS Adapter]
   │                    └─→ [e-KYC Adapter]
   ├─ Claims
   └─ Notifications    ───→ [Email/SMS Adapter]
        ↑
   [PostgreSQL]  [Redis]  [Object Storage]
        │           │             │
   [OpenTelemetry Exporter → Observability Vendor / SIEM]
```

**Why modular monolith now?** Single deployable, clear module seams, fastest MVP. Adapters isolate vendors; easy to swap.

---

## 3) Deployment Topology

- **Frontend:** Vercel (prod + previews). Edge middleware for i18n/auth cookies.
- **Backend:**

  - **Fly.io** (SG primary, Tokyo backup) **or** **AWS** (App Runner/ECS + ALB + WAF).

- **Data:** Managed **PostgreSQL** (primary + HA standby), **Redis** (cache/queues/limits), **S3-compatible** storage (PDFs/photos).
- **CI/CD:** GitHub Actions (lint → typecheck → test → build → deploy).
- **IaC:** Terraform for non-Vercel resources.
- **Envs:** `dev` → `staging` → `prod` (separate vendor sandboxes/keys).

---

## 4) Backend Modules (NestJS)

1. **Auth & Session** — Passwordless (magic link) post-price; JWT access/refresh; roles: `customer`, `support`, `adjuster`, `admin` (OIDC for ops).
2. **Quote** — Entities: `QuoteSession`, `Driver`, `Vehicle`, `CoverageSelection`. NCD/valuation calls, rating math, price breakdown (Base − **NCD** + Add-ons + **SST 8%** + fees).
3. **Policy** — Bind, endorsements, docs (Dec page, **e-Cover Note**), **JPJ submission** with async status.
4. **Payments** — PSP abstraction (FPX, DuitNow/QR, cards); signed webhooks; idempotent capture; double-entry ledger.
5. **Integrations** — Adapters: **NCD/Valuation**, **JPJ**, **e-KYC**, **Email/SMS**, **Address**; retries, DLQ, circuit breakers.
6. **Claims** — FNOL intake, media, third parties, **OD-KFK** eligibility, panel workshop flag.
7. **Notifications** — Locale-aware templates (EN/BM) for email/SMS.

---

## 5) Data Model (Storage Layout)

**Core tables**

- `users(id, email, phone, verified_at, role, …)`
- `quotes(id, user_id?, postcode, ncd_percent, ncd_source, sst_rate, sst_amount, pricing_json, status, …)`
- `drivers(id, quote_id?, policy_id?, full_name, nric_hash, dob, license_class, incidents_json, …)`
- `vehicles(id, quote_id?, policy_id?, plate, vin?, valuation_value, usage, ownership, safety_json, …)`
- `policies(id, policy_no, user_id, product, sum_insured_type, premium_total, jpj_submission_status, …)`
- `policy_drivers`, `policy_vehicles`
- `endorsements(id, policy_id, diff_json, premium_delta, status, …)`
- `claims(id, policy_id, status, loss_date, police_report_no, od_kfk_flag, workshop_type, …)`
- `payments(id, policy_id, method, amount, currency, txn_ref, status, ledger_json, …)`
- `documents(id, policy_id, type, storage_key, hash, issued_at)`
- `audit_logs(id, actor_id, action, entity, entity_id, ts, metadata_json)`

**PII handling**

- **NRIC** stored as **salted hash**; optional **token vault** for reversible retrieval under strict service key. Mask in UI and logs.

**Indexes & RLS**

- Indexes: `idx_quotes_user`, `idx_policies_user`, `idx_drivers_nric_hash`, `idx_vehicles_plate`, `claims(policy_id,status)`.
- **RLS**: customer reads gated by `user_id = current_user_id()`. Admin via service role.

**Backups**

- Nightly full + PITR (7–30 days). Quarterly restore drills.

---

## 6) Integrations (Adapters)

| Adapter           | Purpose                 | Protocol        | Auth                   | Notes                                            |
| ----------------- | ----------------------- | --------------- | ---------------------- | ------------------------------------------------ |
| **ISM/MyCarInfo** | NCD% & market valuation | REST            | API key / IP allowlist | Cache 15–30m; fallback to declared NCD with flag |
| **JPJ eINSURANS** | e-Cover Note submission | REST/SOAP       | mTLS + client cert     | Async status poll; outbox + DLQ                  |
| **PSP**           | FPX, DuitNow/QR, cards  | REST + Webhooks | HMAC/RSA               | Idempotency keys; signature verify               |
| **e-KYC**         | Liveness + doc capture  | REST            | OAuth2/API key         | Trigger per risk tier only                       |
| **Email/SMS**     | Notifications           | REST            | API key                | Locked templates; locales                        |
| **Address MY**    | Autocomplete            | REST            | API key                | Client key domain-scoped                         |

**Resilience patterns**

- Circuit breakers & bulkheads per adapter; exponential backoff (jitter).
- **Outbox pattern** for JPJ/email; **DLQ** with alerts.

---

## 7) Key Flows (Sequences)

**7.1 Quote & Rate**

1. FE collects postcode, drivers, vehicles, coverage → `POST /quote/:id/rate`
2. Quote module validates → NCD/valuation (cached) → rating formula.
3. Return breakdown: Base − **NCD** + Add-ons + **SST 8%** (+ fees) = **Total**.

**7.2 Bind & Pay**

1. Email capture on price → magic link → `/account` consent.
2. `/payments/intent` creates PSP session (FPX/DuitNow/cards).
3. PSP webhook → capture → create `policy`, generate PDFs, **queue JPJ submit**.
4. `/confirmation` shows **JPJ: Pending** → poll until **Accepted** or surfaced error.

**7.3 FNOL & OD-KFK**

1. `POST /claims` (incident, photos, third parties, **police_report_no**).
2. Compute **OD-KFK** eligibility; set flags; issue claim ref.
3. Suggest panel workshop (future: network integration).

---

## 8) Security Architecture

**Perimeter & transport**

- HTTPS everywhere, HSTS, TLS ≥ 1.2. If AWS: WAF + CloudFront for FE.

**Application**

- JWT with short TTL; refresh rotation; strict aud/iss claims.
- CSRF: avoid via SameSite cookies; otherwise anti-CSRF token on non-idempotent routes.
- Validation on FE (Zod) and BE (class-validator).
- CSP strict, XSS sanitization, `X-Frame-Options: DENY`.
- Secrets in cloud secrets manager (no repo secrets).
- PII encryption at rest (DB/objects) + in transit.
- **Audit**: immutable logs for login, rate, bind, JPJ submit, claims.
- **Rate-limit** via Redis (token bucket) for hot endpoints.
- **Fraud hooks**: device fingerprint/velocity checks (basic MVP).

**Threat highlights**

- PSP webhook spoofing → signature verify + replay window + idempotency.
- JPJ misuse → mTLS + IP allowlist + cert rotation.
- NCD enumeration → require plate+NRIC, throttle, monitor.

---

## 9) Observability & Ops

- **OpenTelemetry** for HTTP, DB, Redis, queues, adapters.
- **Dashboards:** API latency/error rates, queue backlogs, PSP/JPJ success, NCD cache hit rate.
- **Logs:** JSON, PII scrubbing; ship to SIEM.
- **Metrics:** RED/USE; SLO budgets + alerts.
- **Tracing:** stitch quote→bind→JPJ.
- **Runbooks:** JPJ stuck pending; PSP webhook retry; NCD outage fallback.

---

## 10) Performance & Caching

- FE code-split per route; bundle target ≤ 120KB gz per onboarding screen.
- Edge cache static; lazy-load non-critical assets.
- Redis cache for valuation/NCD (short TTL); in-proc LRU for config.
- DB: covering indexes, pagination; heavy calls async.
- Docs: pre-signed URLs; compute once on bind; cache metadata.

---

## 11) Compliance & Data Governance

- **BNM e-KYC:** liveness/doc capture gated by risk tier; minimal artefact retention.
- **PDPA 2010:** explicit consent, purpose limitation, DSAR handling, deletion workflows.
- **Tax:** **SST 8%** itemized on receipts; fiscal audit trail.
- **Data residency:** ASEAN/Singapore preference; document cross-border flows.
- **Retention:** quotes 90d; policies 7y; claims 7y; logs 180d (non-PII); traces 30d.
- **Crypto:** KMS-managed keys; quarterly rotation.

---

## 12) Testing Strategy

- **Unit:** rating math, NCD/tax math, validators, adapter mocks.
- **Contract:** FE↔BE (OpenAPI), BE↔vendors (pacts/snapshots).
- **E2E:** quote→bind→JPJ happy path; error/retry paths; keyboard-only a11y.
- **Load:** sustain p95 < 300ms at **500 RPS** on rate endpoint with ≥95% cache hit.
- **Chaos:** simulate outages (JPJ/NCD/PSP); feature-flagged fallbacks.
- **Security:** SAST/DAST, dep scanning, OWASP checks.

---

## 13) Operational Playbooks

- **JPJ pending > 30 min:** Check queue depth & DLQ; requeue with increased backoff; notify CS; banner in policy view.
- **NCD outage:** Flip `ncd_required=false`; accept **declared NCD** with flag; queue reconciliation job.
- **PSP webhook loss:** Run reconciliation cron to query PSP and complete binds.

---

## 14) Config, Feature Flags & Secrets

- **Flags:** `ncd_required`, `jpj_submit_enabled`, `ekyc_required_tier`, `psp=providerA|providerB`, `payments_sandbox`.
- **Secrets:** PSP keys, JPJ certs, NCD keys, email/SMS keys, tokenization key (stored in secrets manager; rotate).
- **Config:** SST rate, rating factors, add-on prices per env.

---

## 15) Migration Plan (DB & Services)

- **Phase 0 (W1):** base schema (users, quotes, drivers, vehicles), audit logs.
- **Phase 1 (W2–3):** coverage selections, rating tables, pricing snapshots.
- **Phase 2 (W4):** policies, payments, documents, JPJ submission tables.
- **Phase 3 (W5):** claims & media.
- **Migrations:** versioned (Prisma/Drizzle/Flyway), forward-only with rollback scripts; seed demo data.

---

## 16) ADRs (Architectural Decision Records)

1. **ADR-001:** Modular monolith (NestJS) for MVP — fastest iteration; service seams kept clean.
2. **ADR-002:** Passwordless customer auth — reduce friction; ops via OIDC.
3. **ADR-003:** Postgres + Redis — mature, managed, sufficient throughput; no Kafka initially.
4. **ADR-004:** Vendor adapters + outbox — resiliency and swapability.
5. **ADR-005:** NRIC protection — tokenization + hashed column; strict logging.
6. **ADR-006:** Vercel FE + Fly/AWS BE — separation; edge UX + regional data control.

---

## 17) Open Items / Next Steps

- Select **PSP** for FPX/DuitNow/cards; start onboarding.
- Confirm **e-KYC** vendor; define risk tiers (who must pass liveness).
- Secure **JPJ eINSURANS** sandbox path & client certs.
- Finalize **NCD/valuation** provider contract & rate limits.
- Lock **rating factors** and add-on pricing for MVP.

---

## 18) Appendices

### A. Example Endpoints

- `POST /api/quote/session` — start (postcode, effectiveDate)
- `PUT /api/quote/session/:id/driver|vehicle` — upserts
- `POST /api/quote/:id/rate` — `{ sumInsuredOptions[], pricing{} }`
- `POST /api/bind` — creates policy, docs, queues JPJ
- `POST /api/integrations/ism/ncd` — `{ plate, nric } → { ncdPercent, source }`
- `POST /api/integrations/jpj/ecovernote` — submit; `GET /…/status`
- `POST /api/claims` — FNOL; `POST /api/claims/:id/od-kfk-check` — eligibility

### B. Price Breakdown Lines (contract)

`basePremium`, `ncdPct`, `addonsTotal`, `sstAmount`, `fees`, `total`.

### C. Minimal Rating Formula (pluggable)

`Premium = Base(product, vehicle_age) * RiskFactors(driver_age, incidents) * Loadings(addons) * (1 - NCD) + Fees + SST`

---

_End of Document_
