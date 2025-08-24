# 12) API (Selected Endpoints)

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
