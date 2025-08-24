# 1) Information Architecture (routes)

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
