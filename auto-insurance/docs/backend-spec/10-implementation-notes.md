# 10) Implementation Notes

- **Validation**: class-validator DTOs mirror FE Zod rules (postcode, NRIC length, enums).
- **Pricing**: SST and NCD lines included in the response to support FE breakdown.
- **Extensibility**: adapters live under `src/integrations/adapters/*`; replace stubs with vendor SDKs; add circuit breakers & backoff.
- **Docs**: on bind, an **e-Cover Note** placeholder record is created; connect real PDF generator later.
- **Queues**: Redis is provisioned; wire background workers (BullMQ/Nest queues) when enabling JPJ outbox.

---
