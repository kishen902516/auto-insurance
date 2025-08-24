# 5) OpenAPI (3.1) — Contract Summary

**Primary endpoints**

- `POST /api/quote/session` — start quote session
- `PUT /api/quote/session/{id}/driver` — upsert drivers
- `PUT /api/quote/session/{id}/vehicle` — upsert vehicles
- `POST /api/quote/{id}/rate` — return price options + breakdown
- `POST /api/bind` — bind after payment; returns policy + docs + JPJ status
- `POST /api/integrations/ism/ncd` — NCD lookup (plate + NRIC)
- `POST /api/integrations/jpj/ecovernote` — submit to JPJ (queued)
- `POST /api/claims` — FNOL create
- `POST /api/claims/{id}/od-kfk-check` — OD-KFK eligibility

> Full schema with request/response models in `openapi.yaml`.

---
