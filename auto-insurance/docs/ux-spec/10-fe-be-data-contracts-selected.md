# 10) FE ↔ BE Data Contracts (selected)

## Create quote session

`POST /api/quote/session`

```json
{ "postcode": "50450", "effectiveDate": "2025-08-16" }
```

**200**

```json
{ "id": "qs_123", "expiresAt": "2025-08-16T10:00:00Z" }
```

## Upsert drivers

`PUT /api/quote/session/:id/driver`

```json
{
  "drivers": [
    {
      "id": "d1",
      "fullName": "Aida Binti Omar",
      "nric": "900101015678",
      "dob": "1990-01-01",
      "licenseClass": "D",
      "licenseState": "MY",
      "incidents": [{ "type": "accident", "year": 2023 }]
    }
  ]
}
```

## Upsert vehicles

`PUT /api/quote/session/:id/vehicle`

```json
{
  "vehicles": [
    {
      "id": "v1",
      "plate": "W1234A",
      "ownership": "owned",
      "usage": "commute",
      "mileageBand": "10-20k",
      "safety": ["immobilizer"]
    }
  ]
}
```

## Rate

`POST /api/quote/:id/rate`
**200**

```json
{
  "sumInsuredOptions": [
    { "type": "market", "value": 42000 },
    { "type": "agreed", "value": 45000 }
  ],
  "pricing": {
    "periods": ["annual", "monthly"],
    "annual": {
      "base": 1500,
      "ncdPct": -0.55,
      "addons": 220,
      "sst": 136,
      "total": 1031
    },
    "monthly": { "installment": 140, "months": 12, "fees": 12 }
  }
}
```

## Bind

`POST /api/bind`

```json
{
  "quoteId": "q_123",
  "email": "aida@email.com",
  "consents": ["pdpa", "ekyc"],
  "paymentRef": "psp_456"
}
```

**200**

```json
{
  "policyId": "pol_789",
  "docs": [{ "type": "ecovernote", "url": "..." }],
  "jpjStatus": "pending"
}
```

---
