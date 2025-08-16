# 11) Backlog to Productionize

1. Replace **PSP stub** with real provider (FPX/DuitNow/cards) + signature verify & idempotency.
2. Implement **JPJ eINSURANS** outbox → submission job + polling callback.
3. Wire **NCD/valuation** to ISM/MyCarInfo; throttle & cache.
4. Add **OpenAPI decorators** on DTOs for generated docs parity.
5. **Auth** hardening: magic-link login, roles/guards, rate limits.
6. **Observability**: OpenTelemetry traces for rating, JPJ, PSP.
7. **A11y & error messaging** alignment with FE analytics event map.

---
