# 7) Key Flows (Sequences)

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
