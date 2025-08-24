# 15) Testing (FE)

- **Unit (Vitest):** masks (NRIC/plate), validators (postcode, email, agreed value rule), price math display.
- **E2E (Playwright):**

  - Quote happy path (1 driver/1 vehicle, Comprehensive + Windscreen)
  - Email after price, payment sandbox, confirmation with JPJ `pending→accepted`
  - A11y keyboard-only run
  - Inject network error on `rate` → recover path

- **Visual regression:** 320 / 768 / 1280 widths.

---
