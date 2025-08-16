# 8) Security Architecture

**Perimeter & transport**

- HTTPS everywhere, HSTS, TLS ≥ 1.2. If AWS: WAF + CloudFront for FE.

**Application**

- JWT with short TTL; refresh rotation; strict aud/iss claims.
- CSRF: avoid via SameSite cookies; otherwise anti-CSRF token on non-idempotent routes.
- Validation on FE (Zod) and BE (class-validator).
- CSP strict, XSS sanitization, `X-Frame-Options: DENY`.
- Secrets in cloud secrets manager (no repo secrets).
- PII encryption at rest (DB/objects) + in transit.
- **Audit**: immutable logs for login, rate, bind, JPJ submit, claims.
- **Rate-limit** via Redis (token bucket) for hot endpoints.
- **Fraud hooks**: device fingerprint/velocity checks (basic MVP).

**Threat highlights**

- PSP webhook spoofing → signature verify + replay window + idempotency.
- JPJ misuse → mTLS + IP allowlist + cert rotation.
- NCD enumeration → require plate+NRIC, throttle, monitor.

---
