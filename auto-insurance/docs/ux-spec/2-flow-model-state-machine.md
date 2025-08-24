# 2) Flow Model (state machine)

**States:** `WELCOME → POSTCODE → DRIVER(S) → VEHICLE(S) → ADDRESS → COVERAGE → PRICING → ACCOUNT → CHECKOUT → CONFIRMATION`
**Events:** `NEXT`, `BACK`, `SAVE_DRAFT`, `ADD_DRIVER`, `ADD_VEHICLE`, `RATE`, `ERROR`, `TIMEOUT`
**Guards:**

- `RATE` allowed when ≥1 driver, ≥1 vehicle, postcode present, coverage chosen.
- `CHECKOUT` allowed when email verified and consents ticked.
  **Side effects:**
- On each `NEXT`: `autosave(session)`
- On `RATE`: show interstitial 600–1200ms then price.

---
