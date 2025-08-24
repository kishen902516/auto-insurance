# 6) Functional Requirements

## 6.1 Quoting & Rating

- Inputs: driver(s), vehicle(s), address, usage, incidents, prior cover
- **NCD**: retrieve from Central NCD DB (plate + NRIC); fallback to declared with verification flag
- **Sum insured**: **Market Value** (valuation service) or **Agreed Value** with guidance
- Premium calc: base + add-ons − NCD + **SST 8%** + fees/discounts
- Persist quote; editable until bind

## 6.2 Bind & Payments

- Identity/consents; **e-KYC** (doc capture + liveness) per risk tier
- Methods: **FPX**, **DuitNow/QR**, cards
- On success: create policy, generate docs, **submit to JPJ eINSURANS**, show status (Pending→Accepted)

## 6.3 Documents

- Generate **e-Cover Note**, policy schedule, ID cards (PDF)
- Email + in-app delivery; re-download anytime

## 6.4 Self-Service Endorsements (MVP subset)

- Change address, add/remove driver, add/remove vehicle (simple cases), adjust coverage, add/remove add-ons; show premium deltas; collect/refund

## 6.5 Claims (FNOL)

- Guided intake; **police report #**; photos; third-party info
- **OD-KFK** eligibility check; panel workshop routing; claim reference

---
