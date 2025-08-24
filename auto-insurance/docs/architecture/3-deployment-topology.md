# 3) Deployment Topology

- **Frontend:** Vercel (prod + previews). Edge middleware for i18n/auth cookies.
- **Backend:**

  - **Fly.io** (SG primary, Tokyo backup) **or** **AWS** (App Runner/ECS + ALB + WAF).

- **Data:** Managed **PostgreSQL** (primary + HA standby), **Redis** (cache/queues/limits), **S3-compatible** storage (PDFs/photos).
- **CI/CD:** GitHub Actions (lint → typecheck → test → build → deploy).
- **IaC:** Terraform for non-Vercel resources.
- **Envs:** `dev` → `staging` → `prod` (separate vendor sandboxes/keys).

---
