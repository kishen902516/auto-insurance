# 13) Operational Playbooks

- **JPJ pending > 30 min:** Check queue depth & DLQ; requeue with increased backoff; notify CS; banner in policy view.
- **NCD outage:** Flip `ncd_required=false`; accept **declared NCD** with flag; queue reconciliation job.
- **PSP webhook loss:** Run reconciliation cron to query PSP and complete binds.

---
