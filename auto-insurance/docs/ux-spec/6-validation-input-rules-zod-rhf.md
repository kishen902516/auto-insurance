# 6) Validation & Input Rules (Zod + RHF)

```ts
// Postcode (MY)
export const PostcodeZ = z.string().regex(/^\d{5}$/, "Enter 5-digit postcode");

// NRIC (MyKad) - accept with/without dashes; store raw 12 digits
export const NRICZ = z
  .string()
  .transform((s) => s.replace(/-/g, ""))
  .refine((s) => /^\d{12}$/.test(s), "Enter 12-digit NRIC");

// Plate (permissive JPJ)
export const PlateZ = z
  .string()
  .transform((s) => s.toUpperCase())
  .refine(
    (s) => /^[A-Z]{1,3}\d{1,4}[A-Z]{0,2}$/.test(s),
    "Enter a valid plate"
  );

// Currency (RM)
export const RMZ = z.number().min(0).max(500000);

// Email (deferred until price)
export const EmailZ = z.string().email();

// Coverage selection
export const CoverageZ = z
  .object({
    product: z.enum(["TP", "TPFT", "COMP"]),
    addons: z
      .array(
        z.enum([
          "WINDSCREEN",
          "SPECIAL_PERILS",
          "ALL_DRIVERS",
          "WAIVER_BETTERMENT",
          "E_HAILING",
        ])
      )
      .default([]),
    sumInsuredType: z.enum(["market", "agreed"]),
    sumInsured: z.number().optional(),
  })
  .refine(
    (v) =>
      v.sumInsuredType === "market" || (!!v.sumInsured && v.sumInsured > 0),
    "Set an agreed value when choosing Agreed"
  );
```

**Error UX:** Inline under fields; page-level summary region (ARIA live) on submit if any errors exist.

---
