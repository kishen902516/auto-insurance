# 6) Prisma Schema (excerpt)

```prisma
model Quote {
  id            String   @id @default(cuid())
  postcode      String
  effectiveDate DateTime
  status        String   @default("draft")
  ncdPercent    Float?
  ncdSource     String?  // cnd|declared
  sstRate       Float?
  sstAmount     Int?
  pricingJson   Json?
  drivers       Driver[]
  vehicles      Vehicle[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Driver {
  id           String   @id @default(cuid())
  quoteId      String?
  policyId     String?
  fullName     String
  nricHash     String   // hashed NRIC only
  dob          DateTime?
  licenseClass String?
  licenseState String?  @default("MY")
  incidentsJson Json?
  createdAt    DateTime @default(now())
  @@index([nricHash])
}

model Policy {
  id                 String   @id @default(cuid())
  policyNo           String   @unique
  userId             String
  product            String   // TP|TPFT|COMP
  sumInsuredType     String   // market|agreed
  sumInsured         Int?
  premiumTotal       Int
  jpjSubmissionStatus String  @default("pending")
  effective          DateTime
  expiration         DateTime
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
  // … relations omitted
}
```

---
