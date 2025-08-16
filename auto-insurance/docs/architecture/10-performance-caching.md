# 10) Performance & Caching

- FE code-split per route; bundle target ≤ 120KB gz per onboarding screen.
- Edge cache static; lazy-load non-critical assets.
- Redis cache for valuation/NCD (short TTL); in-proc LRU for config.
- DB: covering indexes, pagination; heavy calls async.
- Docs: pre-signed URLs; compute once on bind; cache metadata.

---
