# 2) Reference Architecture (Logical)

```
[Browser]
   ↓ HTTPS
[Next.js Frontend (Vercel)]
   ↕ REST/GraphQL (fetch)
[API Gateway (NestJS)]
   ├─ Auth & Session
   ├─ Quote            ───→ [Rating Engine (in-proc)]
   ├─ Policy           ───→ [Docs Service (PDF)]
   ├─ Payments         ───→ [PSP Adapter: FPX/DuitNow/Cards]
   ├─ Integrations     ─┬─→ [NCD/Valuation (ISM/MyCarInfo)]
   │                    ├─→ [JPJ eINSURANS Adapter]
   │                    └─→ [e-KYC Adapter]
   ├─ Claims
   └─ Notifications    ───→ [Email/SMS Adapter]
        ↑
   [PostgreSQL]  [Redis]  [Object Storage]
        │           │             │
   [OpenTelemetry Exporter → Observability Vendor / SIEM]
```

**Why modular monolith now?** Single deployable, clear module seams, fastest MVP. Adapters isolate vendors; easy to swap.

---
