# 9) Performance & Resilience

- Code-split by route; target < 120KB gz per onboarding screen.
- Use SVG for illustrations; lazy-load non-critical assets.
- Autosave debounce 400ms; retry with backoff (0.5s, 1s, 2s…).
- Keep last form state in `localStorage` + server draft for recovery.
- Rating requests abortable; guard double-submits (disable CTA during in-flight).

---
