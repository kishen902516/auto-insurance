# 2) Repository Layout

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
