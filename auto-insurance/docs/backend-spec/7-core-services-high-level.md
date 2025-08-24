# 7) Core Services (high level)

## Rating stub (`src/rating/rating.engine.ts`)

- Inputs: product, driver/vehicle risk factors, **NCD**, addons, **SST 8%**.
- Outputs: `annual` totals + `monthly` approximation.

## Quote module

- **Session** create → returns `{id, expiresAt}`
- **Drivers/Vehicles** upsert with NRIC hashing & plate normalization
- **Rate** → stores pricing snapshot on `Quote`, returns price + sum-insured options

## Policy module

- **Bind** (post-payment) → creates `Policy`, generates doc ref (e-Cover Note), returns **JPJ pending** status

## Integrations

- Adapters for **NCD**, **JPJ**, **PSP**, **e-KYC** (stubs now; real shims later).
- Pattern: retries, outbox/queue (to be wired when moving beyond stubs).

## Claims

- **FNOL** create; **OD-KFK** check (heuristic stub).

---
