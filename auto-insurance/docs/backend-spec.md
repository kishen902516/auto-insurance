# Scaffold API & DB — Delivery Pack v0.1 (Malaysia Motor Insurance)

**Status:** Draft • **Owner:** Architect (BMad) • **Date:** 16 Aug 2025 • **Scope:** Quote → Rate → Bind/Pay → Docs/JPJ → Self-Service (stub) → FNOL

---

## Revision History

| Version | Date        | Author    | Notes                                         |
| ------- | ----------- | --------- | --------------------------------------------- |
| 0.1     | 16 Aug 2025 | Architect | Initial NestJS + Prisma scaffold with OpenAPI |

---

## 1) Overview

This pack contains a runnable **NestJS + Prisma** backend scaffold aligned with the PRD/Architecture Doc. It exposes core endpoints, database schema, and integration adapter stubs for **NCD**, **JPJ**, **Payments**, and **e-KYC**. Use it to unblock FE integration, contract tests, and early demos.

---

## 2) Repository Layout

```
motor-my-api/
├─ package.json
├─ tsconfig.json
├─ .env.example
├─ openapi.yaml                # Core contract (3.1)
├─ prisma/
│  ├─ schema.prisma            # DB schema
│  ├─ migrations/              # (generated)
│  └─ seed.ts
└─ src/
   ├─ main.ts
   ├─ app.module.ts
   ├─ common/
   │  └─ utils/crypto.util.ts  # NRIC hashing
   ├─ rating/rating.engine.ts  # rating stub
   ├─ auth/…                   # (skeleton)
   ├─ quote/                   # session, drivers, vehicles, rate
   ├─ policy/                  # bind + docs stub
   ├─ payments/                # PSP intent + webhook stub
   ├─ integrations/            # NCD, JPJ, eKYC, PSP adapters
   └─ claims/                  # FNOL + OD-KFK check
```

---

## 3) Quick Start

```bash
# 1) Install
pnpm i  # or npm i / yarn

# 2) Configure env & start infra
cp .env.example .env
docker run -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_USER=motor -e POSTGRES_DB=motor_my postgres:16
docker run -p 6379:6379 redis:7

# 3) Prisma
pnpm prisma generate
pnpm prisma migrate dev --name init
pnpm run seed

# 4) Run API
pnpm dev
# Swagger UI: http://localhost:4000/docs
```

---

## 4) Environment (.env.example)

```
NODE_ENV=development
PORT=4000
DATABASE_URL="postgresql://motor:password@localhost:5432/motor_my?schema=public"
REDIS_URL="redis://localhost:6379"

# Integrations
NCD_API_KEY="changeme"
JPJ_CLIENT_CERT_PATH="./certs/jpj/client.pem"
JPJ_CLIENT_KEY_PATH="./certs/jpj/key.pem"
PSP_PROVIDER="fpx"      # or 'duitnow', 'cards'
PSP_API_KEY="changeme"
EKYC_API_KEY="changeme"

# Security
TOKENIZATION_KEY="32-byte-hex-key"
JWT_SECRET="super-secret"
```

**Notes**

- Keep **NRIC** out of logs; the app stores a **salted hash** (see `crypto.util.ts`).
- Secrets go to your secrets manager in real deployments.

---

## 5) OpenAPI (3.1) — Contract Summary

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

## 6) Prisma Schema (excerpt)

```prisma
model Quote {
  id            String   @id @default(cuid())
  postcode      String
  effectiveDate DateTime
  status        String   @default("draft")
  ncdPercent    Float?
  ncdSource     String?  // cnd|declared
  sstRate       Float?
  sstAmount     Int?
  pricingJson   Json?
  drivers       Driver[]
  vehicles      Vehicle[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Driver {
  id           String   @id @default(cuid())
  quoteId      String?
  policyId     String?
  fullName     String
  nricHash     String   // hashed NRIC only
  dob          DateTime?
  licenseClass String?
  licenseState String?  @default("MY")
  incidentsJson Json?
  createdAt    DateTime @default(now())
  @@index([nricHash])
}

model Policy {
  id                 String   @id @default(cuid())
  policyNo           String   @unique
  userId             String
  product            String   // TP|TPFT|COMP
  sumInsuredType     String   // market|agreed
  sumInsured         Int?
  premiumTotal       Int
  jpjSubmissionStatus String  @default("pending")
  effective          DateTime
  expiration         DateTime
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
  // … relations omitted
}
```

---

## 7) Core Services (high level)

### Rating stub (`src/rating/rating.engine.ts`)

- Inputs: product, driver/vehicle risk factors, **NCD**, addons, **SST 8%**.
- Outputs: `annual` totals + `monthly` approximation.

### Quote module

- **Session** create → returns `{id, expiresAt}`
- **Drivers/Vehicles** upsert with NRIC hashing & plate normalization
- **Rate** → stores pricing snapshot on `Quote`, returns price + sum-insured options

### Policy module

- **Bind** (post-payment) → creates `Policy`, generates doc ref (e-Cover Note), returns **JPJ pending** status

### Integrations

- Adapters for **NCD**, **JPJ**, **PSP**, **e-KYC** (stubs now; real shims later).
- Pattern: retries, outbox/queue (to be wired when moving beyond stubs).

### Claims

- **FNOL** create; **OD-KFK** check (heuristic stub).

---

## 8) Security & PII

- **NRIC**: never store raw; hash with app-level secret (`TOKENIZATION_KEY`).
- **JWT**: short-lived; rotate refresh; audience/issuer checks (to be added).
- **Logging**: JSON, PII scrubbing; avoid payload dumps in prod.

---

## 9) Smoke Tests (cURL)

```bash
# Create session
curl -sX POST localhost:4000/api/quote/session \
  -H 'content-type: application/json' \
  -d '{"postcode":"50450","effectiveDate":"2025-08-16"}'

# Upsert driver
curl -sX PUT localhost:4000/api/quote/session/<ID>/driver \
  -H 'content-type: application/json' \
  -d '{"drivers":[{"fullName":"Aida Binti Omar","nric":"900101-01-5678","licenseClass":"D"}]}'

# Upsert vehicle
curl -sX PUT localhost:4000/api/quote/session/<ID>/vehicle \
  -H 'content-type: application/json' \
  -d '{"vehicles":[{"plate":"W1234A","ownership":"owned","usage":"commute"}]}'

# Rate
curl -sX POST localhost:4000/api/quote/<ID>/rate \
  -H 'content-type: application/json' \
  -d '{"product":"COMP","addons":["WINDSCREEN"],"sumInsuredType":"market"}'

# Bind (mock)
curl -sX POST localhost:4000/api/bind \
  -H 'content-type: application/json' \
  -d '{"quoteId":"q_123","email":"aida@email.com","consents":["pdpa","ekyc"],"paymentRef":"psp_456"}'
```

---

## 10) Implementation Notes

- **Validation**: class-validator DTOs mirror FE Zod rules (postcode, NRIC length, enums).
- **Pricing**: SST and NCD lines included in the response to support FE breakdown.
- **Extensibility**: adapters live under `src/integrations/adapters/*`; replace stubs with vendor SDKs; add circuit breakers & backoff.
- **Docs**: on bind, an **e-Cover Note** placeholder record is created; connect real PDF generator later.
- **Queues**: Redis is provisioned; wire background workers (BullMQ/Nest queues) when enabling JPJ outbox.

---

## 11) Backlog to Productionize

1. Replace **PSP stub** with real provider (FPX/DuitNow/cards) + signature verify & idempotency.
2. Implement **JPJ eINSURANS** outbox → submission job + polling callback.
3. Wire **NCD/valuation** to ISM/MyCarInfo; throttle & cache.
4. Add **OpenAPI decorators** on DTOs for generated docs parity.
5. **Auth** hardening: magic-link login, roles/guards, rate limits.
6. **Observability**: OpenTelemetry traces for rating, JPJ, PSP.
7. **A11y & error messaging** alignment with FE analytics event map.

---

## 12) Appendix — Key Files (inline)

### `package.json` (scripts)

```json
{
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "start": "node dist/main.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev --name init",
    "seed": "ts-node --transpile-only prisma/seed.ts",
    "openapi:serve": "redocly preview-docs openapi.yaml"
  }
}
```

### `src/common/utils/crypto.util.ts`

```ts
import { createHmac } from "crypto";
const SALT = process.env.TOKENIZATION_KEY || "dev-salt";
export function hashNRIC(raw: string): string {
  const normalized = raw.replace(/-/g, "").trim();
  return createHmac("sha256", SALT).update(normalized).digest("hex");
}
```

### `src/rating/rating.engine.ts` (excerpt)

```ts
export function rate(input: RatingInput) {
  // base → risk factors → -NCD → +addons → +SST
  // returns { annual, monthly }
}
```

---

## 13) How to Hand Off

- Share this **Delivery Pack** with FE + QA.
- FE can integrate using Swagger at `/docs` and the **OpenAPI** file.
- QA can run smoke cURLs above; extend to Postman tests.
- Start vendor onboarding in parallel (PSP, JPJ, ISM/MyCarInfo, e-KYC).

---

_End of Document_
