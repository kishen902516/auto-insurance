# Appendix C — Event Taxonomy (Detailed)

| Event               | When                     | Key Props                                          |               |                   |
| ------------------- | ------------------------ | -------------------------------------------------- | ------------- | ----------------- |
| `quote_started`     | First screen submit      | `session_id`, `postcode`                           |               |                   |
| `driver_added`      | Driver form saved        | `driver_count`, `has_incidents`                    |               |                   |
| `vehicle_added`     | Vehicle form saved       | `vehicle_count`, `lookup_source`                   |               |                   |
| `coverage_selected` | Coverage step completed  | `product` (\`TP                                    | TPFT          | COMP`), `addons\` |
| `price_revealed`    | Pricing returned         | `ncd_percent`, `sum_insured_type`, `premium_total` |               |                   |
| `email_captured`    | Email entered post-price | `method` (\`email                                  | magic_link\`) |                   |
| `payment_success`   | PSP callback ok          | `psp`, `method`, `amount`, `currency`              |               |                   |
| `policy_issued`     | Policy created           | `policy_id`, `product`, `premium_total`            |               |                   |
| `jpj_submitted`     | After bind               | `ref`, `status`                                    |               |                   |
| `jpj_accepted`      | JPJ ACK                  | `ref`, `ts`                                        |               |                   |
| `fnol_started`      | Claims entry             | `policy_id`                                        |               |                   |
| `claim_submitted`   | FNOL done                | `claim_id`, `od_kfk_flag`                          |               |                   |

---
