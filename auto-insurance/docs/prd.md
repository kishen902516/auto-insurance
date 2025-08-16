# Auto Insurance (Motor) — PRD v1.0 (Malaysia)

**Status:** Draft • **Owner:** PM (BMad) • **Date:** 16 Aug 2025 • **Target MVP:** 6 weeks

---

## Revision History

| Version | Date        | Author | Notes                                                    |
| ------- | ----------- | ------ | -------------------------------------------------------- |
| 1.0     | 16 Aug 2025 | PM     | Initial PRD for MY market with Lemonade-style onboarding |

---

## 1) Executive Summary

Build a direct-to-consumer web app to quote, bind, and service **Motor insurance** in Malaysia with a **conversational, single-question-per-screen** onboarding flow. MVP supports **Comprehensive**, **TPFT**, and **TP** products plus common MY add-ons; **FPX/DuitNow** payments; **e-Cover Note/JPJ eINSURANS** submission; **NCD** retrieval; and simple **FNOL** with **OD-KFK** guidance.

**Goals (MVP)**

- Bindable quote in ≤ 3 minutes for standard risks
- Comprehensive with add-ons (Windscreen, Special Perils, All/Unnamed Drivers)
- Instant issuance with **e-Cover Note** + JPJ submission
- Self-service: docs + basic endorsements
- Claims intake with OD-KFK path when eligible

**Non-Goals (MVP)**

- Commercial vehicles, motorcycles, agent/broker portal, telematics pricing, deep fraud scoring, repair network management, multi-country rollout

---

## 2) Personas & JTBD

- **Driver/Owner (Retail):** Get clear cover fast at a fair price; understand add-ons and NCD impact.
- **Claims Initiator:** Simple, reassuring guidance; preserve NCD via OD-KFK when not at fault.
- **Ops/Underwriting:** Visibility into risk flags, audit trails, decision rationale.
- **Customer Support:** Search policies, resend docs, trigger endorsements safely.

---

## 3) Scope

### In (MVP)

- Products: **Comprehensive**, **TPFT**, **TP**
- Add-ons: **Windscreen**, **Special Perils (flood/landslide)**, **All/Unnamed Drivers**, **Waiver of Betterment**, e-hailing endorsement
- **NCD** retrieval & apply; **Market vs Agreed** sum insured
- **Quote → Bind → Pay** (FPX/DuitNow/cards)
- **JPJ eINSURANS / e-Cover Note** submission
- Documents: schedule/dec page, e-Cover Note, ID cards
- Self-service endorsements (subset)
- **FNOL** with police report # and OD-KFK eligibility

### Out (V1+)

- Recurring direct debit, full endorsements catalog, rich workshop locator, telematics, agent portal, advanced fraud, multi-country

---

## 4) User Journeys

### A) Quote → Bind (Happy Path)

1. Welcome → **Postcode** (MY) → effective date (defaults today)
2. Driver: name, **NRIC (MyKad)**, DOB, license class/state, prior claims
3. Vehicle: plate → valuation/VIN; usage, ownership, garaging
4. Address: MY autocomplete
5. Coverage wizard: **TP / TPFT / Comprehensive** + add-ons with explainers
6. Price: base, **NCD%**, add-ons, **SST 8%** itemized; monthly/annual toggle
7. Account/email capture (deferred until price), consents
8. Pay (FPX/DuitNow or card) → bind → **e-Cover Note** issued + sent to JPJ
9. Confirmation: dashboard + docs

### B) Policy Self-Service

View/download docs, change contact details, simple endorsements (driver/vehicle/add-ons), billing.

### C) Claims (FNOL)

60-second intake: what/when/where, drivable?, photos, third parties, **police report #**. If eligible: **OD-KFK** guidance and panel workshop option.

---

## 5) UX & Content Requirements

- **Single question per screen**, large inputs, inline validation, friendly microcopy
- **No email wall** until price; autosave; resume via magic link
- Short **“crunching numbers”** interstitial before price reveal
- EN/BM toggle; currency **RM** formatting
- Transparent breakdown: **Sum insured (Market/Agreed)**, **NCD%**, add-ons, **SST 8%**, total
- WCAG 2.2 AA; semantic forms; ARIA for stepper/alerts; keyboard-first

---

## 6) Functional Requirements

### 6.1 Quoting & Rating

- Inputs: driver(s), vehicle(s), address, usage, incidents, prior cover
- **NCD**: retrieve from Central NCD DB (plate + NRIC); fallback to declared with verification flag
- **Sum insured**: **Market Value** (valuation service) or **Agreed Value** with guidance
- Premium calc: base + add-ons − NCD + **SST 8%** + fees/discounts
- Persist quote; editable until bind

### 6.2 Bind & Payments

- Identity/consents; **e-KYC** (doc capture + liveness) per risk tier
- Methods: **FPX**, **DuitNow/QR**, cards
- On success: create policy, generate docs, **submit to JPJ eINSURANS**, show status (Pending→Accepted)

### 6.3 Documents

- Generate **e-Cover Note**, policy schedule, ID cards (PDF)
- Email + in-app delivery; re-download anytime

### 6.4 Self-Service Endorsements (MVP subset)

- Change address, add/remove driver, add/remove vehicle (simple cases), adjust coverage, add/remove add-ons; show premium deltas; collect/refund

### 6.5 Claims (FNOL)

- Guided intake; **police report #**; photos; third-party info
- **OD-KFK** eligibility check; panel workshop routing; claim reference

---

## 7) Compliance, Legal & Privacy (Malaysia)

- **Regulator:** Bank Negara Malaysia (BNM)
- **Detariffication:** liberalised pricing for Comprehensive/TPFT; TP constraints remain
- **e-KYC:** per BNM policy document (liveness, fraud signals, record-keeping)
- **PDPA 2010:** consent, purpose limitation, data subject rights
- **Claims settlement:** align customer-facing SLAs and wording
- **Takaful (optional future):** Shariah governance if offered

---

## 8) Non-Functional Requirements

- **Availability:** 99.5% (MVP)
- **Performance:** p95 page load < 2.5s; p95 API < 300ms (quote/rate)
- **Security:** PII encryption (in transit/at rest); RBAC (Owner/Member/Viewer/Adjuster); audit logs; OWASP Top 10 review
- **Observability:** logs, metrics, traces (OpenTelemetry); error budgets
- **Accessibility:** WCAG 2.2 AA
- **Data:** tenant isolation; configurable retention

---

## 9) Success Metrics & Analytics

**Targets**

- Quote rate ≥ 60% of starts
- Bind rate ≥ 15% of quotes
- Time to first quote ≤ 3 min
- FNOL start ≤ 60s from claims entry
- NPS ≥ 50 onboarding; < 20% drop-off from price → payment

**Event Taxonomy (high level)**

- `quote_started`, `driver_added`, `vehicle_added`, `coverage_selected`, `price_revealed`, `email_captured`, `payment_success`, `policy_issued`, `jpj_submitted`, `jpj_accepted`, `fnol_started`, `claim_submitted`

---

## 10) Architecture & Integrations (Overview)

- **Frontend:** Next.js (App Router, TS), React Hook Form, TanStack Query/Table, Zod, Playwright/Vitest
- **Backend:** NestJS (Node 20), domains: `quote`, `policy`, `rating`, `payments`, `claims`, `identity`
- **Data:** PostgreSQL (managed), Redis (cache + jobs), object storage (PDF/photos)
- **Hosting:** Vercel (FE) + Fly.io/Render/AWS (BE)
- **Integrations (MVP):**

  - **NCD + Valuation:** ISM/MyCarInfo
  - **JPJ eINSURANS / e-Cover Note:** submission + status
  - **Payments:** FPX, DuitNow/QR, cards (local PSP)
  - **Address:** MY autocomplete
  - **e-KYC:** liveness + document checks
  - **Email/SMS:** transactional provider

---

## 11) Data Model (Key Fields/Deltas)

- `quotes`: `ncd_percent`, `ncd_source` (`cnd|declared`), `sst_rate`, `sst_amount`
- `policies`: `sum_insured_type` (`market|agreed`), `jpj_submission_status` (`pending|accepted|failed`)
- `claims`: `police_report_no`, `od_kfk_flag`, `workshop_type` (`panel|non_panel`)

---

## 12) API (Selected Endpoints)

- `POST /api/quote/session` → start (postcode, effective_date)
- `PUT /api/quote/session/:id/driver`
- `PUT /api/quote/session/:id/vehicle`
- `POST /api/quote/:id/rate` → price options + breakdown (base, add-ons, **NCD**, **SST**)
- `POST /api/bind` → e-KYC gate, payment, create policy
- `POST /api/integrations/ism/ncd` → { plate, nric } → { ncd%, effective_date, source }
- `POST /api/integrations/jpj/ecovernote` → { ref, status }
- `POST /api/claims` → FNOL create
- `POST /api/claims/:id/od-kfk-check` → eligibility

_All endpoints documented via OpenAPI; contract tests required for merge._

---

## 13) Acceptance Criteria (MVP)

1. User obtains a **priced quote** for 1 driver/1 vehicle, selects **Comprehensive**, adds **Windscreen**, sees **NCD** and **SST 8%** itemized, and **binds via FPX**.
2. System generates and emails **e-Cover Note** and submits to **JPJ**; policy view shows **Accepted**.
3. User downloads documents and performs one endorsement (e.g., add driver) with correct premium delta + receipt.
4. FNOL captures **police report #** and—when eligible—offers **OD-KFK** path with clear guidance.
5. Analytics show events from `quote_started` through `policy_issued` on the happy path.

---

## 14) Release Plan (6 Weeks)

- **W1 – Foundations:** repos, CI/CD, auth shell, DB, design tokens, first onboarding screens
- **W2 – Entities:** driver/vehicle flows; address; autosave; valuation stub
- **W3 – Coverage & Rating:** coverage wizard, add-ons, rating stub, price screen (with “crunching”)
- **W4 – Bind & Pay:** e-KYC light, FPX/DuitNow, documents (PDF), JPJ submission stub
- **W5 – Self-Service & FNOL:** endorsements subset, FNOL intake, analytics, accessibility pass
- **W6 – Hardening:** JPJ live, NCD live, perf & security pass, UAT & go-live

---

## 15) Risks & Mitigations

- **Integration readiness (JPJ/NCD/PSP):** feature flags; sandbox; retries + fallbacks (manual NCD with flag; JPJ retry queue)
- **Regulatory drift:** track BNM circulars; compliance review gates
- **Pricing complexity:** start with standard risks; divert edge cases to assisted bind
- **Drop-offs:** atomic steps; defer email; autosave + re-engagement email

---

## 16) Open Questions (for V1.1)

- PSP choice(s) for FPX/DuitNow and prod onboarding timeline?
- Panel workshop network integration approach (maps + capacity)?
- Agreed-value rules by vehicle age (betterment/waiver thresholds)?

---

## Appendix A — Content Style Guide (EN/BM snippets)

- **Tone:** Friendly, plain-English/Bahasa Malaysia, reassuring, concise.
- **Examples (EN → BM):**

  - “We’ll check this later if you’re not sure.” → “Tak apa jika belum pasti, kita boleh semak kemudian.”
  - “This helps us personalise your price.” → “Maklumat ini bantu kami sesuaikan harga anda.”

- **Microcopy patterns:**

  - Single clear question per screen
  - Helper text under label, not placeholders
  - Error hints: short, actionable (“Enter 12-digit NRIC”)

- **Sensitive steps:** Explain why (NCD check, e-KYC), how long, and privacy basics.

---

## Appendix B — Accessibility Checklist (WCAG 2.2 AA)

- Semantic landmarks (header/main/nav/footer)
- Labels tied to inputs; programmatic error associations
- Keyboard-only navigation; visible focus states
- Sufficient contrast; text resizable 200% without loss
- Motion/animation optional; reduced motion respected
- Screen-reader friendly stepper, progress, and alerts

---

## Appendix C — Event Taxonomy (Detailed)

| Event               | When                     | Key Props                                          |               |                   |
| ------------------- | ------------------------ | -------------------------------------------------- | ------------- | ----------------- |
| `quote_started`     | First screen submit      | `session_id`, `postcode`                           |               |                   |
| `driver_added`      | Driver form saved        | `driver_count`, `has_incidents`                    |               |                   |
| `vehicle_added`     | Vehicle form saved       | `vehicle_count`, `lookup_source`                   |               |                   |
| `coverage_selected` | Coverage step completed  | `product` (\`TP                                    | TPFT          | COMP`), `addons\` |
| `price_revealed`    | Pricing returned         | `ncd_percent`, `sum_insured_type`, `premium_total` |               |                   |
| `email_captured`    | Email entered post-price | `method` (\`email                                  | magic_link\`) |                   |
| `payment_success`   | PSP callback ok          | `psp`, `method`, `amount`, `currency`              |               |                   |
| `policy_issued`     | Policy created           | `policy_id`, `product`, `premium_total`            |               |                   |
| `jpj_submitted`     | After bind               | `ref`, `status`                                    |               |                   |
| `jpj_accepted`      | JPJ ACK                  | `ref`, `ts`                                        |               |                   |
| `fnol_started`      | Claims entry             | `policy_id`                                        |               |                   |
| `claim_submitted`   | FNOL done                | `claim_id`, `od_kfk_flag`                          |               |                   |

---

## Appendix D — Acceptance Test Scenarios (samples)

- **AT-01 Quote Happy Path:** 1 driver/1 vehicle, Comprehensive + Windscreen → price shows **NCD** + **SST 8%**; bind via FPX → e-Cover Note; JPJ `Accepted`.
- **AT-02 Declared NCD Fallback:** CND offline → user declares NCD → `ncd_source="declared"` flag present; price reflects NCD; later reconciliation allowed.
- **AT-03 OD-KFK Eligibility:** Comprehensive policy; not at fault; OD-KFK suggested; claim created with `od_kfk_flag=true`.
- **AT-04 A11y Keyboard Flow:** Full onboarding with keyboard only; no traps; screen-reader labels verified.

---

## Appendix E — Glossary (MY)

- **NCD:** No-Claim Discount (Malaysia scale, up to 55%)
- **SST:** Sales & Service Tax (8% on taxable general insurance)
- **JPJ:** Jabatan Pengangkutan Jalan (Road Transport Dept)
- **e-Cover Note:** Electronic cover note accepted for road tax renewal
- **OD-KFK:** Own Damage—Knock For Knock (not-at-fault path)

---

_End of Document_
