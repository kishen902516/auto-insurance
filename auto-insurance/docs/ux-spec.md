# Front-End Spec — Malaysia Motor Insurance (Web)

**Status:** Draft • **Owner:** UX Expert (BMad) • **Date:** 16 Aug 2025 • **Target MVP:** 6 weeks

---

## Revision History

| Version | Date        | Author | Notes                                                        |
| ------- | ----------- | ------ | ------------------------------------------------------------ |
| 1.0     | 16 Aug 2025 | UX     | Initial FE spec for MY market with Lemonade-style onboarding |

---

## 0) Experience Principles

- **One clear task per screen.** Minimal inputs, large targets, inline guidance.
- **Deferred friction.** No email wall until price; autosave each step.
- **Conversational tone.** Friendly EN/BM microcopy; reassure and explain “why”.
- **Clarity on money.** Always show **Sum Insured**, **NCD**, **SST 8%**, **Total**.
- **Fast feedback.** Skeletons + optimistic UI; brief “crunching numbers” interstitial.

---

## 1) Information Architecture (routes)

- `/` — Welcome
- `/quote/postcode`
- `/quote/driver` (list + editor)
- `/quote/vehicle` (list + editor)
- `/quote/address`
- `/quote/coverage` (TP / TPFT / Comprehensive + add-ons)
- `/quote/price` (cards + breakdown, email capture)
- `/account` (verify email, consents, e-KYC light gate if needed)
- `/checkout` (FPX/DuitNow/cards)
- `/confirmation` (policy, docs, JPJ status)
- `/dashboard` (Policies, Billing, Claims, Docs, Profile)
- `/claims/new` (FNOL)

**Route guard:** If session missing prerequisites, redirect to first unmet step. Preserve form state & scroll.

---

## 2) Flow Model (state machine)

**States:** `WELCOME → POSTCODE → DRIVER(S) → VEHICLE(S) → ADDRESS → COVERAGE → PRICING → ACCOUNT → CHECKOUT → CONFIRMATION`
**Events:** `NEXT`, `BACK`, `SAVE_DRAFT`, `ADD_DRIVER`, `ADD_VEHICLE`, `RATE`, `ERROR`, `TIMEOUT`
**Guards:**

- `RATE` allowed when ≥1 driver, ≥1 vehicle, postcode present, coverage chosen.
- `CHECKOUT` allowed when email verified and consents ticked.
  **Side effects:**
- On each `NEXT`: `autosave(session)`
- On `RATE`: show interstitial 600–1200ms then price.

---

## 3) Screen Specs (wireframe level)

### 3.1 `/` — Welcome

- **Hero:** “Let’s get your car covered.”
- **Primary CTA:** Start → `/quote/postcode`
- **Secondary:** EN/BM toggle; “Already have a policy? Sign in”.

### 3.2 `/quote/postcode`

- **Input:** 5-digit postcode (MY)
- **Help:** “This helps us fetch local pricing.”
- **Validation:** required, numeric, length=5
- **CTA:** Continue (enabled once valid)
- **Autosave:** on blur/submit

### 3.3 `/quote/driver`

- **Pattern:** List of drivers + “Add driver” button
- **Editor fields:** Full name; **NRIC (MyKad)** 12 digits (mask on focus `######-##-####`, store raw); DOB (derive from NRIC, editable); License class/state; Prior claims/incidents (radio + conditional textarea)
- **Microcopy:** “Not sure? Tak apa—kita boleh semak kemudian.”
- **CTA:** Save driver; Continue enabled when ≥1 driver

### 3.4 `/quote/vehicle`

- **Pattern:** List + “Add vehicle”
- **Editor fields:** Plate (JPJ formats, auto uppercase); optional VIN decode; Ownership (Owned/Financed); Usage (Personal/Commute/Business); Mileage band; Safety features (checkboxes)
- **Inline note:** “We’ll estimate **Market Value** automatically.”
- **CTA:** Save vehicle; Continue when ≥1 vehicle

### 3.5 `/quote/address`

- **Address autocomplete (MY)**; Unit/Level freeform
- **Toggle:** Garaging = address (default true)
- **CTA:** Continue

### 3.6 `/quote/coverage`

- **Product switcher:** TP / TPFT / Comprehensive
- **Add-ons (toggle cards):** Windscreen, Special Perils (flood/landslide), All/Unnamed Drivers, Waiver of Betterment, e-hailing endorsement
- **Sum Insured:** Radio → **Market Value** (default) / **Agreed Value**; if Agreed, numeric field with live premium delta
- **Helper:** One-line plain explainers under each add-on
- **CTA:** See my price → triggers `RATE`

### 3.7 `/quote/price`

- **Interstitial:** “Crunching the numbers…” (brief animation)
- **Price cards:** Tabs for Monthly / Annual
- **Breakdown lines:** Base premium; **NCD –xx%**; Add-ons; **SST 8%**; Total
- **Inline adjustments:** Add-ons and Sum Insured editable with re-rate
- **Email capture:** field + “Send magic link”; consent checkboxes
- **CTA:** Continue → `/account` after email entered/verified

### 3.8 `/account`

- **If not verified:** Magic link verification or code fallback
- **Consents:** PDPA & e-KYC acknowledgements (links to sheets)
- **CTA:** Continue to payment

### 3.9 `/checkout`

- **Methods:** FPX (bank list modal), DuitNow/QR, Cards
- **Summary:** Mirrors price breakdown; “Edit coverages” link → `/quote/price`
- **CTA:** Pay & bind (disabled until PSP ready) → success route `/confirmation`

### 3.10 `/confirmation`

- **Success:** “You’re covered 🎉”
- **Docs:** e-Cover Note, Policy Schedule (download buttons)
- **JPJ tile:** Status `Pending` → `Accepted` (poll with backoff)
- **Next steps:** Add second driver? Start FNOL?

### 3.11 `/claims/new` (FNOL)

- **Stepper:** Incident → Photos → Parties → Police report # → Review
- **Hint:** OD-KFK shown when Comprehensive + “not at fault”

---

## 4) Components (React)

### Layout

- `<AppShell>` header/footer; language switch; auth state
- `<StepHeader>` title + optional breadcrumb/checklist
- `<StickyCTA>` mobile persistent bottom bar

### Inputs

- `<TextField>` (masking, help/error, status)
- `<NRICField>` (auto-DOB extraction hook)
- `<PlateField>` (format assistance)
- `<RadioCardGroup>` / `<ToggleCard>` (product & add-ons)
- `<MoneyField>` (RM currency formatting)
- `<PhoneField>` (MY)
- `<AddressAutocompleteMY>`
- `<DateField>`
- `<Checkbox>` (subtext slot)

### Data & Feedback

- `<PriceBreakdown>` (lines + totals)
- `<InterstitialCrunching>`
- `<Toast>`
- `<StatusPill>` (`pending|accepted|failed`)
- `<EmptyState>`

### Lists & Editors

- `<EntityList>` (drivers/vehicles)
- `<EntityEditorDrawer>` (form wrapper)
- `<ConfirmDialog>`

**Props docs:** Provide `value`, `onChange`, `error`, `helpText`, `aria-*` for all form inputs.

---

## 5) Design Tokens

- **Spacing:** 4-pt scale → 4, 8, 12, 16, 24, 32, 48
- **Type:** H1 36/44; H2 28/36; H3 22/30; Body 16/24; Small 14/20
- **Radius:** 12 (cards), 8 (inputs), 999 (pills)
- **Elevation:** E0 flat; E1 card; E2 modal
- **Motion:** base 160ms; enter 240ms; standard/calm easing
- **Color roles:** text (primary/secondary/inverse); background (canvas/surface); accent (brand); states (success/warning/danger/info)
- **Focus:** 2px outline, offset 2px (high-contrast friendly)

---

## 6) Validation & Input Rules (Zod + RHF)

```ts
// Postcode (MY)
export const PostcodeZ = z.string().regex(/^\d{5}$/, "Enter 5-digit postcode");

// NRIC (MyKad) - accept with/without dashes; store raw 12 digits
export const NRICZ = z
  .string()
  .transform((s) => s.replace(/-/g, ""))
  .refine((s) => /^\d{12}$/.test(s), "Enter 12-digit NRIC");

// Plate (permissive JPJ)
export const PlateZ = z
  .string()
  .transform((s) => s.toUpperCase())
  .refine(
    (s) => /^[A-Z]{1,3}\d{1,4}[A-Z]{0,2}$/.test(s),
    "Enter a valid plate"
  );

// Currency (RM)
export const RMZ = z.number().min(0).max(500000);

// Email (deferred until price)
export const EmailZ = z.string().email();

// Coverage selection
export const CoverageZ = z
  .object({
    product: z.enum(["TP", "TPFT", "COMP"]),
    addons: z
      .array(
        z.enum([
          "WINDSCREEN",
          "SPECIAL_PERILS",
          "ALL_DRIVERS",
          "WAIVER_BETTERMENT",
          "E_HAILING",
        ])
      )
      .default([]),
    sumInsuredType: z.enum(["market", "agreed"]),
    sumInsured: z.number().optional(),
  })
  .refine(
    (v) =>
      v.sumInsuredType === "market" || (!!v.sumInsured && v.sumInsured > 0),
    "Set an agreed value when choosing Agreed"
  );
```

**Error UX:** Inline under fields; page-level summary region (ARIA live) on submit if any errors exist.

---

## 7) Copy Framework (EN/BM samples)

- **NRIC help:**
  EN “12 digits on your MyKad. We’ll use this to check your NCD.”
  BM “12 digit pada MyKad anda. Kami guna untuk semak NCD anda.”

- **Crunching:**
  EN “Crunching the numbers…”
  BM “Sedang kira harga anda…”

- **OD-KFK hint:**
  EN “Not at fault? We can keep your NCD via OD-KFK.”
  BM “Bukan salah anda? NCD boleh dikekalkan melalui OD-KFK.”

- **Price disclaimer:**
  EN “Your price may change if details vary during verification.”
  BM “Harga mungkin berubah jika maklumat berbeza semasa pengesahan.”

---

## 8) Accessibility (WCAG 2.2 AA)

- Semantic landmarks; logical headings; one `<main>` per page.
- Labels bound to inputs; `aria-describedby` for help/error.
- Keyboard-only friendly; visible focus ring; no traps.
- Error summary uses polite live region; focus moves to H1 on route change.
- Respect `prefers-reduced-motion`; allow disabling non-essential animations.
- Stepper/breadcrumb uses `aria-current="step"` and announces progress.

---

## 9) Performance & Resilience

- Code-split by route; target < 120KB gz per onboarding screen.
- Use SVG for illustrations; lazy-load non-critical assets.
- Autosave debounce 400ms; retry with backoff (0.5s, 1s, 2s…).
- Keep last form state in `localStorage` + server draft for recovery.
- Rating requests abortable; guard double-submits (disable CTA during in-flight).

---

## 10) FE ↔ BE Data Contracts (selected)

### Create quote session

`POST /api/quote/session`

```json
{ "postcode": "50450", "effectiveDate": "2025-08-16" }
```

**200**

```json
{ "id": "qs_123", "expiresAt": "2025-08-16T10:00:00Z" }
```

### Upsert drivers

`PUT /api/quote/session/:id/driver`

```json
{
  "drivers": [
    {
      "id": "d1",
      "fullName": "Aida Binti Omar",
      "nric": "900101015678",
      "dob": "1990-01-01",
      "licenseClass": "D",
      "licenseState": "MY",
      "incidents": [{ "type": "accident", "year": 2023 }]
    }
  ]
}
```

### Upsert vehicles

`PUT /api/quote/session/:id/vehicle`

```json
{
  "vehicles": [
    {
      "id": "v1",
      "plate": "W1234A",
      "ownership": "owned",
      "usage": "commute",
      "mileageBand": "10-20k",
      "safety": ["immobilizer"]
    }
  ]
}
```

### Rate

`POST /api/quote/:id/rate`
**200**

```json
{
  "sumInsuredOptions": [
    { "type": "market", "value": 42000 },
    { "type": "agreed", "value": 45000 }
  ],
  "pricing": {
    "periods": ["annual", "monthly"],
    "annual": {
      "base": 1500,
      "ncdPct": -0.55,
      "addons": 220,
      "sst": 136,
      "total": 1031
    },
    "monthly": { "installment": 140, "months": 12, "fees": 12 }
  }
}
```

### Bind

`POST /api/bind`

```json
{
  "quoteId": "q_123",
  "email": "aida@email.com",
  "consents": ["pdpa", "ekyc"],
  "paymentRef": "psp_456"
}
```

**200**

```json
{
  "policyId": "pol_789",
  "docs": [{ "type": "ecovernote", "url": "..." }],
  "jpjStatus": "pending"
}
```

---

## 11) Analytics (FE emits)

- `view_screen` `{screen}`
- `form_autosave` `{screen, ok}`
- `quote_started`
- `driver_added` `{count}`
- `vehicle_added` `{count}`
- `coverage_selected` `{product, addons}`
- `price_revealed` `{ncdPct, sumInsuredType, premiumTotal}`
- `email_captured` `{method}`
- `payment_success` `{psp, method, amount}`
- `policy_issued` `{policyId}`
- `jpj_status` `{status}`
- `fnol_started` / `claim_submitted` `{odKfkFlag}`
  All events include `sessionId`, `device`, `locale`.

---

## 12) Error States

- **Validation:** Inline hint + icon; CTA allowed, but on submit show summary and scroll to first error.
- **Rating/API:** Non-blocking banner — “We couldn’t fetch a price. Retrying… \[Try again]”.
- **Payments:** Show PSP error inline; “Retry payment”; keep cart intact.
- **JPJ pending:** `StatusPill` + tooltip explaining typical timing; auto-refresh with backoff.

---

## 13) File Structure (Next.js)

```
/app
  /(onboarding)
    /quote/postcode/page.tsx
    /quote/driver/page.tsx
    /quote/vehicle/page.tsx
    /quote/address/page.tsx
    /quote/coverage/page.tsx
    /quote/price/page.tsx
  /account/page.tsx
  /checkout/page.tsx
  /confirmation/page.tsx
  /claims/new/page.tsx
/components
  /forms/*.tsx
  /pricing/*.tsx
  /common/*.tsx
/lib
  /api/*.ts
  /validation/*.ts
  /i18n/*.ts
/styles/tokens.css
```

---

## 14) i18n (EN/BM)

- Use message keys; store locale in cookie; default from browser.
  **Example bundle:**

```json
{
  "cta.start": "Start",
  "label.nric": "NRIC (MyKad)",
  "help.nric.en": "12 digits on your MyKad. We’ll use this to check your NCD.",
  "help.nric.bm": "12 digit pada MyKad anda. Kami guna untuk semak NCD anda.",
  "pricing.crunching.en": "Crunching the numbers…",
  "pricing.crunching.bm": "Sedang kira harga anda…"
}
```

---

## 15) Testing (FE)

- **Unit (Vitest):** masks (NRIC/plate), validators (postcode, email, agreed value rule), price math display.
- **E2E (Playwright):**

  - Quote happy path (1 driver/1 vehicle, Comprehensive + Windscreen)
  - Email after price, payment sandbox, confirmation with JPJ `pending→accepted`
  - A11y keyboard-only run
  - Inject network error on `rate` → recover path

- **Visual regression:** 320 / 768 / 1280 widths.

---

## 16) Design Deliverables

- Low-fi wireframes per screen (with EN/BM copy + error text)
- Component spec sheets (`NRICField`, `PriceBreakdown`, `ToggleCard`, `InterstitialCrunching`)
- Token sheet (type scale, spacing, elevation)
- Interactive onboarding prototype (branching for product + add-ons)

---

## 17) Lemonade-Style Touches to Keep

- Friendly microcopy under labels (not placeholders only).
- One primary CTA per screen; destructive actions as secondary.
- Short anticipation before price; subtle delight, never gimmicky.
- Lightweight progress (title + checkmarks), avoid misleading percentage bars.

---

_End of Document_
