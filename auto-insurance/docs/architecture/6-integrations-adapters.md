# 6) Integrations (Adapters)

| Adapter           | Purpose                 | Protocol        | Auth                   | Notes                                            |
| ----------------- | ----------------------- | --------------- | ---------------------- | ------------------------------------------------ |
| **ISM/MyCarInfo** | NCD% & market valuation | REST            | API key / IP allowlist | Cache 15–30m; fallback to declared NCD with flag |
| **JPJ eINSURANS** | e-Cover Note submission | REST/SOAP       | mTLS + client cert     | Async status poll; outbox + DLQ                  |
| **PSP**           | FPX, DuitNow/QR, cards  | REST + Webhooks | HMAC/RSA               | Idempotency keys; signature verify               |
| **e-KYC**         | Liveness + doc capture  | REST            | OAuth2/API key         | Trigger per risk tier only                       |
| **Email/SMS**     | Notifications           | REST            | API key                | Locked templates; locales                        |
| **Address MY**    | Autocomplete            | REST            | API key                | Client key domain-scoped                         |

**Resilience patterns**

- Circuit breakers & bulkheads per adapter; exponential backoff (jitter).
- **Outbox pattern** for JPJ/email; **DLQ** with alerts.

---
