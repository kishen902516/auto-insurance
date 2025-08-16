# Early Test Architecture — High-Risk Areas (QA Plan v0.1)

**Status:** Draft • **Owner:** QA (BMad) • **Date:** 16 Aug 2025 • **Scope:** Malaysia Motor Insurance MVP (Web) — Quote → Bind/Pay → Docs/JPJ → Self-Service → FNOL

---

## Revision History

| Version | Date        | Author | Notes                                              |
| ------- | ----------- | ------ | -------------------------------------------------- |
| 0.1     | 16 Aug 2025 | QA     | Initial early test architecture on high-risk areas |

---

## 1) Summary

Risk-based, shift-left QA plan aligned to PRD, FE Spec, and Architecture Doc. Focus is on external integrations, pricing correctness, PII/PDPA, and flow resilience. Artifacts target fast CI feedback with contract and E2E smoke gates.

---

## 2) Top Risks & Early Focus

- **R1 Integrations:** PSP (FPX/DuitNow/cards), JPJ eINSURANS, NCD/valuation, e-KYC (timeouts, retries, idempotency, signatures/mTLS, schema drift).
- **R2 Pricing transparency:** Base × loadings → −NCD → +Add-ons → +SST 8% → fees; rounding to RM cents; endorsement deltas.
- **R3 PII/PDPA:** NRIC hashing/tokenization, consent capture, DSAR/retention, log & trace scrubbing.
- **R4 Flow/state:** Autosave, resume via magic link, back/refresh/multi-tab safety, deferred email.
- **R5 Payments/bind races:** Duplicate webhooks, back-button mid-redirect, reconciliation.
- **R6 JPJ lifecycle:** Outbox → queued submit → poll → accepted/failed, user UI updates.
- **R7 Claims & OD-KFK:** Police report capture, eligibility logic, panel workshop flag.
- **R8 A11y & i18n:** WCAG 2.2 AA, keyboard-only, EN/BM parity, currency formatting.
- **R9 Performance:** p95 < 300ms for `/rate` at burst; queue health.

---

## 3) Test Architecture & Tooling

- **Unit:** Vitest/Jest (FE/BE validators, price math, adapters, log scrubbers).
- **Contract:** OpenAPI validation (Prism/Swagger-validator); Pact for PSP/JPJ/NCD/e-KYC.
- **Service virtualization:** WireMock/Testcontainers (all vendors); Prism mock from `openapi.yaml`.
- **API integration:** Supertest + Testcontainers (Postgres/Redis) against Nest app.
- **E2E:** Playwright (mobile-first); sandbox PSP redirect; magic-link loop.
- **A11y:** Playwright-axe + manual keyboard walkthroughs.
- **Security:** SCA/SAST; targeted DAST (headers/CSP, auth flows).
- **Performance:** k6 scripts for `/rate` and JPJ worker throughput.
- **Observability checks:** Assert OTEL spans/attrs; log redaction tests.

**CI lanes (parallel):**

1. Lint/Type/Unit
2. Contract (OpenAPI + Pact)
3. API Integration (Testcontainers)
4. E2E Smoke (Playwright)
5. A11y Smoke (axe)
6. Perf Sanity (k6 \~60s)
7. Security Scan

**Merge gate:** All lanes green; unit coverage ≥ 85% on rating, adapters, auth, bind/JPJ.

---

## 4) Vendor Simulation Matrix (WireMock/Pact)

| Adapter               | Happy | Timeout | 4xx | 5xx | Slow | Duplicate | Schema drift | Notes                          |
| --------------------- | ----- | ------: | --: | --: | ---: | --------: | -----------: | ------------------------------ |
| PSP FPX/DuitNow/cards | ✅    |      ✅ |  ✅ |  ✅ |   ✅ |        ✅ |           ✅ | Signature verify + idempotency |
| JPJ eINSURANS         | ✅    |      ✅ |  ✅ |  ✅ |   ✅ |        ✅ |           ✅ | mTLS; outbox + poll            |
| NCD/Valuation         | ✅    |      ✅ |  ✅ |  ✅ |   ✅ |         — |           ✅ | Cache TTL; rate limits         |
| e-KYC                 | ✅    |      ✅ |  ✅ |  ✅ |   ✅ |         — |           ✅ | Risk-tier toggles              |

---

## 5) High-Risk Checklists (Do/Verify)

### 5.1 Payments (PSP)

- [ ] HMAC/RSA signature verified; reject stale timestamps.
- [ ] Idempotency: duplicate webhook ≠ double bind/charge.
- [ ] PSP cancel/timeout returns to safe state; retry path visible.
- [ ] MYR amounts equal quote (incl. **SST 8%**); rounding consistent; receipt sums match.
- [ ] Reconciliation job finalizes missed webhooks; audits emitted.

### 5.2 JPJ eINSURANS

- [ ] Payload well-formed; mTLS handshake; client cert rotation tested.
- [ ] Outbox → retry/backoff (jitter) → poll; DLQ alarms.
- [ ] Idempotent resubmission; user UI `Pending→Accepted/Failed` with guidance.

### 5.3 NCD/Valuation

- [ ] Requires plate + NRIC (hashed); throttle attempts; abuse lockout.
- [ ] Cache TTL honored; fallback to `ncd_source="declared"`; reconciliation updates later.
- [ ] UI shows explicit NCD line; math stable 0–55%.

### 5.4 e-KYC

- [ ] Liveness result gates bind per policy; manual review fallback.
- [ ] Artefacts minimal, retention timers enforced; DSAR export/delete.

### 5.5 Pricing & Tax

- [ ] **Order**: Base×loadings → −NCD → +Add-ons → +SST → fees.
- [ ] Rounding to 2 decimals; line items sum to total.
- [ ] Endorsement deltas preview + payment/refund flows.

### 5.6 PII/PDPA

- [ ] No raw NRIC/email/phone in logs/traces; automated scrubbing tests.
- [ ] Consent captured before NCD/e-KYC; audit entries exist.
- [ ] DSAR: export/delete flows; retention windows applied.

### 5.7 Flow/State

- [ ] Autosave debounce; resume via magic link; multi-tab supported.
- [ ] Back/refresh safe; errors preserved; email deferred until price.
- [ ] Feature flags respected (`ncd_required`, `jpj_submit_enabled`, `payments_sandbox`).

### 5.8 Claims & OD-KFK

- [ ] Police report number captured or explained; 24-hour hint shown.
- [ ] OD-KFK eligibility flagged for COMP + not-at-fault.
- [ ] Media upload limits + retry on flaky networks.

### 5.9 Accessibility & Localization

- [ ] Keyboard-only pass; visible focus; ARIA ties help/errors.
- [ ] EN/BM parity; RM currency/number formatting; respects reduced-motion.

---

## 6) Concrete Early Tests

### 6.1 Unit

- NRIC validator/mask (12 digits; with/without dashes); hashing stability.
- Plate normalization; postcode regex.
- Rating math boundaries (age 24/25/65/66; incidents 0–3).
- `total = round((base×factors×(1−NCD) + addons) + SST)`; inclusion of **SST 8%**.
- Log scrubber forbids PII patterns.

### 6.2 Contract

- OpenAPI request/response validation (pos/neg cases).
- Pact: PSP/JPJ/NCD/e-KYC headers, signatures, error shapes.

### 6.3 API Integration (Testcontainers)

- Quote → drivers → vehicles → rate → bind (mock PSP) → JPJ outbox queued.
- NCD outage → `ncd_source="declared"` end-to-end.
- Duplicate PSP webhook → exactly one policy & receipt.

### 6.4 E2E (Playwright, mobile)

- Happy path (COMP + Windscreen; email after price; FPX sandbox; confirmation; JPJ `pending→accepted`).
- Back/refresh stress; autosave/resume; multi-tab resume.
- PSP cancel → retry → success.
- Keyboard-only run.

### 6.5 Performance (k6)

- `/api/quote/:id/rate` burst to **500 RPS** (95% cached) → p95 ≤ 300ms; error ≤ 1%.
- JPJ worker drains queue under threshold; DLQ remains 0.

### 6.6 Security/Headers

- CSP, HSTS, Referrer-Policy, X-Frame-Options; no mixed content.
- Cookie flags; CORS sane.
- ZAP passive scan 0 high/medium.

---

## 7) Test Data & Fixtures

- Synthetic **NRICs** (never real PII), store only **hashes**.
- JPJ plates: `W1234A`, `ABC1234`, etc.
- Vehicles parameterized by age (0–15y), ownership, usage.
- Seeds for common scenarios (new driver, high NCD, multi-vehicle).
- WireMock mappings per adapter for happy/timeout/4xx/5xx/slow/duplicate.

---

## 8) Observability Assertions

- Spans: `quote.rate`, `payments.capture`, `policy.bind`, `jpj.submit`, `ncd.lookup`.
- Span attributes exclude PII; include opaque IDs.
- Metrics: API latency/error rates, queue depth, cache hit %, PSP/JPJ success.
- Audit events: login/magic link, rating, bind, JPJ submit, FNOL.

---

## 9) CI/CD Wiring & Gates

**Jobs:** `lint-type-unit`, `contract-openapi`, `pact`, `api-integration`, `e2e-smoke`, `a11y-smoke`, `perf-sanity`, `security-scan`
**Fail build if:**

- Contract tests fail,
- PII scrubbing test fails,
- `/rate` p95 > 300ms in perf sanity,
- E2E smoke fails,
- Security headers missing.

---

## 10) Early Tickets (Ready to File)

1. Contract test harness (Prism + negative cases).
2. Pact suites + WireMock mappings for PSP/JPJ/NCD/e-KYC.
3. Log scrubbing unit tests (NRIC/email/phone) + CI regex gate.
4. Rating math boundary & rounding tests + snapshot breakdowns.
5. PSP webhook idempotency & bind transaction test.
6. JPJ outbox worker tests (retry/backoff, idempotency, DLQ alerting).
7. Autosave/resume E2E (multi-tab, network blips).
8. A11y keyboard path suite (Playwright + axe).
9. k6 scripts & Grafana boards (rate + JPJ worker).
10. DSAR workflows (export/delete) & retention timers.

---

## 11) Exit Criteria (MVP Readiness)

- All CI lanes green; coverage ≥ 85% on critical units.
- E2E happy path stable across browsers (Chromium/WebKit).
- `/rate` p95 ≤ 300ms at perf-sanity load; queues healthy.
- No PII leakage; DSAR & retention verified.
- JPJ & PSP flows resilient (retries, idempotency, reconciliation).

---

_End of Document_
