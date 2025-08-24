# 3) Screen Specs (wireframe level)

## 3.1 `/` — Welcome

- **Hero:** “Let’s get your car covered.”
- **Primary CTA:** Start → `/quote/postcode`
- **Secondary:** EN/BM toggle; “Already have a policy? Sign in”.

## 3.2 `/quote/postcode`

- **Input:** 5-digit postcode (MY)
- **Help:** “This helps us fetch local pricing.”
- **Validation:** required, numeric, length=5
- **CTA:** Continue (enabled once valid)
- **Autosave:** on blur/submit

## 3.3 `/quote/driver`

- **Pattern:** List of drivers + “Add driver” button
- **Editor fields:** Full name; **NRIC (MyKad)** 12 digits (mask on focus `######-##-####`, store raw); DOB (derive from NRIC, editable); License class/state; Prior claims/incidents (radio + conditional textarea)
- **Microcopy:** “Not sure? Tak apa—kita boleh semak kemudian.”
- **CTA:** Save driver; Continue enabled when ≥1 driver

## 3.4 `/quote/vehicle`

- **Pattern:** List + “Add vehicle”
- **Editor fields:** Plate (JPJ formats, auto uppercase); optional VIN decode; Ownership (Owned/Financed); Usage (Personal/Commute/Business); Mileage band; Safety features (checkboxes)
- **Inline note:** “We’ll estimate **Market Value** automatically.”
- **CTA:** Save vehicle; Continue when ≥1 vehicle

## 3.5 `/quote/address`

- **Address autocomplete (MY)**; Unit/Level freeform
- **Toggle:** Garaging = address (default true)
- **CTA:** Continue

## 3.6 `/quote/coverage`

- **Product switcher:** TP / TPFT / Comprehensive
- **Add-ons (toggle cards):** Windscreen, Special Perils (flood/landslide), All/Unnamed Drivers, Waiver of Betterment, e-hailing endorsement
- **Sum Insured:** Radio → **Market Value** (default) / **Agreed Value**; if Agreed, numeric field with live premium delta
- **Helper:** One-line plain explainers under each add-on
- **CTA:** See my price → triggers `RATE`

## 3.7 `/quote/price`

- **Interstitial:** “Crunching the numbers…” (brief animation)
- **Price cards:** Tabs for Monthly / Annual
- **Breakdown lines:** Base premium; **NCD –xx%**; Add-ons; **SST 8%**; Total
- **Inline adjustments:** Add-ons and Sum Insured editable with re-rate
- **Email capture:** field + “Send magic link”; consent checkboxes
- **CTA:** Continue → `/account` after email entered/verified

## 3.8 `/account`

- **If not verified:** Magic link verification or code fallback
- **Consents:** PDPA & e-KYC acknowledgements (links to sheets)
- **CTA:** Continue to payment

## 3.9 `/checkout`

- **Methods:** FPX (bank list modal), DuitNow/QR, Cards
- **Summary:** Mirrors price breakdown; “Edit coverages” link → `/quote/price`
- **CTA:** Pay & bind (disabled until PSP ready) → success route `/confirmation`

## 3.10 `/confirmation`

- **Success:** “You’re covered 🎉”
- **Docs:** e-Cover Note, Policy Schedule (download buttons)
- **JPJ tile:** Status `Pending` → `Accepted` (poll with backoff)
- **Next steps:** Add second driver? Start FNOL?

## 3.11 `/claims/new` (FNOL)

- **Stepper:** Incident → Photos → Parties → Police report # → Review
- **Hint:** OD-KFK shown when Comprehensive + “not at fault”

---
