# Low-Fidelity Wireframes — Malaysia Motor Insurance (Web)

**Status:** Draft • **Owner:** UX Expert (BMad) • **Date:** 16 Aug 2025 • **Target MVP:** 6 weeks

---

## Revision History

| Version | Date        | Author | Notes                                                            |
| ------- | ----------- | ------ | ---------------------------------------------------------------- |
| 1.0     | 16 Aug 2025 | UX     | Initial low-fi wireframes (Lemonade-style onboarding, MY market) |

---

## 0) Conventions

- `[]` input, `( )` radio, `{ }` checkbox, `>` primary CTA, `…` helper text
- Screens are **mobile-first**; desktop notes called out where relevant
- Components correspond to the Front-End Spec (e.g., `NRICField`, `PriceBreakdown`)

---

## 1) Information Architecture (routes)

`/` → `/quote/postcode` → `/quote/driver` → `/quote/vehicle` → `/quote/address` → `/quote/coverage` → `/quote/price` → `/account` → `/checkout` → `/confirmation`
Claims: `/claims/new`

---

## 2) Screen Wireframes & Specs

### 2.1 Welcome (`/`)

**Goal:** Start quickly; language toggle visible

```
┌────────────────────────────────────────────┐
│ Logo                                       │
│                                            │
│ Let’s get your car covered.                │
│ …It only takes a few minutes.              │
│                                            │
│               > Start                      │
│                                            │
│ Already have a policy?  Sign in            │
│ EN | BM                                    │
└────────────────────────────────────────────┘
```

**Copy:** EN “Let’s get your car covered.” / BM “Jom lindungi kereta anda.”
**Interaction:** `> Start` → `/quote/postcode`
**Analytics:** `view_screen{welcome}`, `quote_started`

---

### 2.2 Postcode (`/quote/postcode`)

**Goal:** Capture postcode

```
┌────────────────────────────────────────────┐
│ Step: Location                             │
│ What’s your postcode?                      │
│ [  _ _ _ _ _  ]                             │
│ …This helps us fetch local pricing.        │
│                                            │
│ > Continue                                 │
└────────────────────────────────────────────┘
```

**Validation:** 5 digits (“Enter 5-digit postcode”)
**Autosave:** on blur
**Next:** `/quote/driver`
**Analytics:** `view_screen{postcode}`, `form_autosave`, `postcode_submitted`

---

### 2.3 Drivers list + editor (`/quote/driver`)

**Goal:** At least one driver

```
┌────────────────────────────────────────────┐
│ Step: Driver(s)                            │
│ Who drives the car?                        │
│ [ + Add driver ]                           │
│ • Aida Binti Omar        [Edit] [Del]      │
│                                            │
│ > Continue                                 │
└────────────────────────────────────────────┘

[Drawer: Add/Edit Driver]
┌────────────────────────────────────────────┐
│ Full name             [               ]    │
│ NRIC (MyKad)          [ ######-##-#### ]   │
│ Date of birth         [  dd/mm/yyyy   ]    │
│ License class/state   [  D  ][  MY   ]     │
│ Prior incidents?  ( ) No  ( ) Yes          │
│ If yes: Details       [               ]    │
│ …Not sure? We can check later.             │
│ [ Cancel ]                 > Save driver   │
└────────────────────────────────────────────┘
```

**Validation:** Name required; NRIC 12 digits; DOB valid
**Analytics:** `view_screen{driver_list}`, `driver_added{count}`

---

### 2.4 Vehicles list + editor (`/quote/vehicle`)

**Goal:** At least one vehicle

```
┌────────────────────────────────────────────┐
│ Step: Vehicle(s)                           │
│ Tell us about the car.                     │
│ [ + Add vehicle ]                          │
│ • W1234A (Owned, Commute) [Edit] [Del]     │
│                                            │
│ > Continue                                 │
└────────────────────────────────────────────┘

[Drawer: Add/Edit Vehicle]
┌────────────────────────────────────────────┐
│ Plate (JPJ)           [ W1234A         ]   │
│ VIN (optional)        [                ]   │
│ Ownership             ( ) Owned ( ) Fin    │
│ Usage                 ( ) Personal         │
│                       ( ) Commute ( ) Biz  │
│ Mileage band          [ 10–20k / yr    ]   │
│ Safety features  { } Immobilizer { } ABS   │
│ …We’ll estimate Market Value automatically │
│ [ Cancel ]                 > Save vehicle  │
└────────────────────────────────────────────┘
```

**Validation:** Plate format; ownership + usage required
**Analytics:** `view_screen{vehicle_list}`, `vehicle_added{count}`

---

### 2.5 Address (`/quote/address`)

**Goal:** Garaging address

```
┌────────────────────────────────────────────┐
│ Step: Address                              │
│ Where is the car kept?                     │
│ [ Address autocomplete …              v ]  │
│ Unit/Floor (optional) [               ]    │
│ {x} Garaging address same as above         │
│ > Continue                                 │
└────────────────────────────────────────────┘
```

**Fallback:** Manual entry if autocomplete fails
**Analytics:** `view_screen{address}`

---

### 2.6 Coverage (`/quote/coverage`)

**Goal:** Select product, add-ons, sum insured

```
┌────────────────────────────────────────────┐
│ Step: Coverage                             │
│ Choose your cover                          │
│ Product:  [ TP ]  [ TPFT ]  [ COMP ✓ ]     │
│                                            │
│ Add-ons                                    │
│ [ ] Windscreen        …Glass repair cover  │
│ [ ] Special Perils    …Flood/landslide     │
│ [ ] All/Unnamed Drivers …Others can drive  │
│ [ ] Waiver of Betterment  …Parts age rule  │
│ [ ] E-hailing         …Grab etc.           │
│                                            │
│ Sum insured                                │
│ (•) Market Value (recommended)             │
│ ( ) Agreed Value  [ RM  ____,___ ]         │
│ …You can change this later.                │
│                                            │
│ > See my price                             │
└────────────────────────────────────────────┘
```

**Validation:** If Agreed selected → value > 0
**Analytics:** `view_screen{coverage}`, `coverage_selected{product,addons}`

---

### 2.7 Pricing (`/quote/price`)

**Goal:** Reveal price; tweak cover; capture email post-price

```
┌────────────────────────────────────────────┐
│ Interstitial (600–1200ms):                 │
│ “Crunching the numbers…”                   │
└────────────────────────────────────────────┘

┌──────────────── Price (tabs) ─────────────┐
│ [ Annual ✓ ]  [ Monthly ]                 │
│                                            │
│ Your price                                 │
│ ───────────────────────────────────────    │
│ Base premium                       RM1,500 │
│ NCD (-55%)                         −RM 825 │
│ Add-ons                              RM220 │
│ SST 8%                               RM136 │
│ Total                               RM1,031│
│ ───────────────────────────────────────    │
│                                            │
│ Adjust cover inline:                       │
│  { } Windscreen   { } Special Perils       │
│  Sum Insured: (•) Market  ( ) Agreed [ ]   │
│                                            │
│ Save your quote                            │
│ Email [ you@domain.com ]  [Send link]      │
│ { } I agree to PDPA & e-KYC notices        │
│ > Continue                                 │
└────────────────────────────────────────────┘
```

**Validation:** Email format; consent required
**Analytics:** `view_screen{price}`, `price_revealed{…}`, `email_captured{method}`

---

### 2.8 Account (`/account`)

**Goal:** Verify email; confirm consents

```
┌────────────────────────────────────────────┐
│ Verify your email                          │
│ We’ve sent a magic link to you@…           │
│ [ Enter code instead ]   [ Resend ]        │
│ Consents                                   │
│ {x} I acknowledge PDPA & e-KYC notices     │
│ > Continue to payment                      │
└────────────────────────────────────────────┘
```

**Errors:** Invalid code; cooldown on resend
**Analytics:** `view_screen{account}`

---

### 2.9 Checkout (`/checkout`)

**Goal:** Take payment; summary editable

```
┌────────────────────────────────────────────┐
│ Pay & bind                                 │
│ Summary                                    │
│ Base RM1,500 | NCD −RM825 | Add-ons RM220  │
│ SST RM136    | Total RM1,031               │
│ [ Edit coverages ]                         │
│                                            │
│ Payment method                             │
│ (•) FPX (Bank transfer)                    │
│ ( ) DuitNow / QR                           │
│ ( ) Card                                   │
│                                            │
│ > Pay & bind                               │
└────────────────────────────────────────────┘
```

**Errors:** PSP failure inline; “Retry payment”
**Analytics:** `view_screen{checkout}`, `payment_success{psp,method,amount}`

---

### 2.10 Confirmation (`/confirmation`)

**Goal:** Close the loop; docs + JPJ status

```
┌────────────────────────────────────────────┐
│ You’re covered 🎉                           │
│ Policy: MY-2025-000123                     │
│ Documents                                  │
│  [ Download e-Cover Note PDF ]             │
│  [ Download Policy Schedule ]              │
│                                            │
│ Road Transport Dept (JPJ)                  │
│ Status: [ Pending ] (auto-refresh …)       │
│ …We’ll notify you once accepted.           │
│                                            │
│ Next steps                                 │
│ [ Add a second driver ]  [ File a claim ]  │
│ > Go to dashboard                          │
└────────────────────────────────────────────┘
```

**States:** `Pending → Accepted/Failed` (pill + tooltip)
**Analytics:** `view_screen{confirmation}`, `policy_issued`, `jpj_submitted`, `jpj_accepted`

---

### 2.11 Claims — FNOL (`/claims/new`)

**Goal:** 60-second intake; OD-KFK hint when eligible

```
┌───────────── Step 1: Incident ─────────────┐
│ What happened? [ dropdown ]                │
│ When did it happen? [ date/time ]          │
│ Where? [ map or text ]                     │
│ Is the car drivable? ( ) Yes ( ) No        │
│ > Continue                                 │
└────────────────────────────────────────────┘

┌───────────── Step 2: Photos ───────────────┐
│ [ + Upload photos ] (3–8)                  │
│ > Continue                                 │
└────────────────────────────────────────────┘

┌──────────── Step 3: Parties ───────────────┐
│ Other vehicle? ( ) No ( ) Yes              │
│ If yes: Plate [        ] Insurer [     ]   │
│ > Continue                                 │
└────────────────────────────────────────────┘

┌──────────── Step 4: Police report ─────────┐
│ Police report number [            ]        │
│ …Lodge within 24 hours where required.     │
│ > Continue                                 │
└────────────────────────────────────────────┘

┌──────────── Step 5: Review ────────────────┐
│ [ Submit claim ]                           │
│ (If COMP + not at fault)                   │
│  💡 OD-KFK can help keep your NCD.         │
└────────────────────────────────────────────┘
```

**Analytics:** `fnol_started`, `claim_submitted{odKfkFlag}`

---

## 3) Copy (Key EN/BM strings)

- **NRIC help:** EN “12 digits on your MyKad. We’ll use this to check your NCD.”
  BM “12 digit pada MyKad anda. Kami guna untuk semak NCD anda.”
- **Price interstitial:** EN “Crunching the numbers…”
  BM “Sedang kira harga anda…”
- **OD-KFK hint:** EN “Not at fault? We can keep your NCD via OD-KFK.”
  BM “Bukan salah anda? NCD boleh dikekalkan melalui OD-KFK.”

---

## 4) Validation Summary

- **Postcode:** exactly 5 digits
- **Driver:** name required; NRIC 12 digits; DOB valid
- **Vehicle:** plate required; ownership + usage required
- **Coverage:** if Agreed value → must be > 0
- **Price:** valid email; consent required before continue
- **Checkout:** surface PSP errors inline; allow retry

---

## 5) Accessibility & Responsive Notes

- One `h1` per route; labels linked to inputs; `aria-describedby` for help/errors
- Error summary (ARIA polite) on submit; focus to `h1` on route change
- Respect `prefers-reduced-motion`; interstitial uses simple opacity/skeleton
- **Mobile:** single column, sticky bottom CTA
- **Desktop:** max width \~720–960px; two-column only on **Price** and **Checkout**

---

## 6) Analytics Map

- Welcome: `quote_started`
- Postcode: `form_autosave`, `postcode_submitted`
- Driver: `driver_added{count}`
- Vehicle: `vehicle_added{count}`
- Coverage: `coverage_selected{product,addons}`
- Price: `price_revealed{ncdPct,sumInsuredType,premiumTotal}`, `email_captured{method}`
- Account: `view_screen{account}`
- Checkout: `payment_success{psp,method,amount}`
- Confirmation: `policy_issued`, `jpj_submitted`, `jpj_accepted`
- FNOL: `fnol_started`, `claim_submitted{odKfkFlag}`

---

### Next options

- Want these as **Figma frame specs** (names, autolayout hints, constraints) or **React form shells** pre-wired with RHF + Zod? I can output either immediately.
