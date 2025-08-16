# 15) Migration Plan (DB & Services)

- **Phase 0 (W1):** base schema (users, quotes, drivers, vehicles), audit logs.
- **Phase 1 (W2–3):** coverage selections, rating tables, pricing snapshots.
- **Phase 2 (W4):** policies, payments, documents, JPJ submission tables.
- **Phase 3 (W5):** claims & media.
- **Migrations:** versioned (Prisma/Drizzle/Flyway), forward-only with rollback scripts; seed demo data.

---
