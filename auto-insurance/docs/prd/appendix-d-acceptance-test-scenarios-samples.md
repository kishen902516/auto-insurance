# Appendix D — Acceptance Test Scenarios (samples)

- **AT-01 Quote Happy Path:** 1 driver/1 vehicle, Comprehensive + Windscreen → price shows **NCD** + **SST 8%**; bind via FPX → e-Cover Note; JPJ `Accepted`.
- **AT-02 Declared NCD Fallback:** CND offline → user declares NCD → `ncd_source="declared"` flag present; price reflects NCD; later reconciliation allowed.
- **AT-03 OD-KFK Eligibility:** Comprehensive policy; not at fault; OD-KFK suggested; claim created with `od_kfk_flag=true`.
- **AT-04 A11y Keyboard Flow:** Full onboarding with keyboard only; no traps; screen-reader labels verified.

---
