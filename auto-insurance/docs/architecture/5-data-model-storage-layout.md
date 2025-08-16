# 5) Data Model (Storage Layout)

**Core tables**

- `users(id, email, phone, verified_at, role, …)`
- `quotes(id, user_id?, postcode, ncd_percent, ncd_source, sst_rate, sst_amount, pricing_json, status, …)`
- `drivers(id, quote_id?, policy_id?, full_name, nric_hash, dob, license_class, incidents_json, …)`
- `vehicles(id, quote_id?, policy_id?, plate, vin?, valuation_value, usage, ownership, safety_json, …)`
- `policies(id, policy_no, user_id, product, sum_insured_type, premium_total, jpj_submission_status, …)`
- `policy_drivers`, `policy_vehicles`
- `endorsements(id, policy_id, diff_json, premium_delta, status, …)`
- `claims(id, policy_id, status, loss_date, police_report_no, od_kfk_flag, workshop_type, …)`
- `payments(id, policy_id, method, amount, currency, txn_ref, status, ledger_json, …)`
- `documents(id, policy_id, type, storage_key, hash, issued_at)`
- `audit_logs(id, actor_id, action, entity, entity_id, ts, metadata_json)`

**PII handling**

- **NRIC** stored as **salted hash**; optional **token vault** for reversible retrieval under strict service key. Mask in UI and logs.

**Indexes & RLS**

- Indexes: `idx_quotes_user`, `idx_policies_user`, `idx_drivers_nric_hash`, `idx_vehicles_plate`, `claims(policy_id,status)`.
- **RLS**: customer reads gated by `user_id = current_user_id()`. Admin via service role.

**Backups**

- Nightly full + PITR (7–30 days). Quarterly restore drills.

---
