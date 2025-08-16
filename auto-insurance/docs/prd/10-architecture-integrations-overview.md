# 10) Architecture & Integrations (Overview)

- **Frontend:** Next.js (App Router, TS), React Hook Form, TanStack Query/Table, Zod, Playwright/Vitest
- **Backend:** NestJS (Node 20), domains: `quote`, `policy`, `rating`, `payments`, `claims`, `identity`
- **Data:** PostgreSQL (managed), Redis (cache + jobs), object storage (PDF/photos)
- **Hosting:** Vercel (FE) + Fly.io/Render/AWS (BE)
- **Integrations (MVP):**

  - **NCD + Valuation:** ISM/MyCarInfo
  - **JPJ eINSURANS / e-Cover Note:** submission + status
  - **Payments:** FPX, DuitNow/QR, cards (local PSP)
  - **Address:** MY autocomplete
  - **e-KYC:** liveness + document checks
  - **Email/SMS:** transactional provider

---
