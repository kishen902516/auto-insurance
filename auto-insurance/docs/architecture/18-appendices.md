# 18) Appendices

## A. Example Endpoints

- `POST /api/quote/session` — start (postcode, effectiveDate)
- `PUT /api/quote/session/:id/driver|vehicle` — upserts
- `POST /api/quote/:id/rate` — `{ sumInsuredOptions[], pricing{} }`
- `POST /api/bind` — creates policy, docs, queues JPJ
- `POST /api/integrations/ism/ncd` — `{ plate, nric } → { ncdPercent, source }`
- `POST /api/integrations/jpj/ecovernote` — submit; `GET /…/status`
- `POST /api/claims` — FNOL; `POST /api/claims/:id/od-kfk-check` — eligibility

## B. Price Breakdown Lines (contract)

`basePremium`, `ncdPct`, `addonsTotal`, `sstAmount`, `fees`, `total`.

## C. Minimal Rating Formula (pluggable)

`Premium = Base(product, vehicle_age) * RiskFactors(driver_age, incidents) * Loadings(addons) * (1 - NCD) + Fees + SST`

---

_End of Document_
