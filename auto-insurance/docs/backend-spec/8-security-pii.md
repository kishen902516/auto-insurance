# 8) Security & PII

- **NRIC**: never store raw; hash with app-level secret (`TOKENIZATION_KEY`).
- **JWT**: short-lived; rotate refresh; audience/issuer checks (to be added).
- **Logging**: JSON, PII scrubbing; avoid payload dumps in prod.

---
