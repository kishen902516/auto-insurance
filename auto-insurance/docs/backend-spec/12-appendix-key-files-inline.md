# 12) Appendix — Key Files (inline)

## `package.json` (scripts)

```json
{
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "start": "node dist/main.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev --name init",
    "seed": "ts-node --transpile-only prisma/seed.ts",
    "openapi:serve": "redocly preview-docs openapi.yaml"
  }
}
```

## `src/common/utils/crypto.util.ts`

```ts
import { createHmac } from "crypto";
const SALT = process.env.TOKENIZATION_KEY || "dev-salt";
export function hashNRIC(raw: string): string {
  const normalized = raw.replace(/-/g, "").trim();
  return createHmac("sha256", SALT).update(normalized).digest("hex");
}
```

## `src/rating/rating.engine.ts` (excerpt)

```ts
export function rate(input: RatingInput) {
  // base → risk factors → -NCD → +addons → +SST
  // returns { annual, monthly }
}
```

---
