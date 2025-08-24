# 4) Components (React)

## Layout

- `<AppShell>` header/footer; language switch; auth state
- `<StepHeader>` title + optional breadcrumb/checklist
- `<StickyCTA>` mobile persistent bottom bar

## Inputs

- `<TextField>` (masking, help/error, status)
- `<NRICField>` (auto-DOB extraction hook)
- `<PlateField>` (format assistance)
- `<RadioCardGroup>` / `<ToggleCard>` (product & add-ons)
- `<MoneyField>` (RM currency formatting)
- `<PhoneField>` (MY)
- `<AddressAutocompleteMY>`
- `<DateField>`
- `<Checkbox>` (subtext slot)

## Data & Feedback

- `<PriceBreakdown>` (lines + totals)
- `<InterstitialCrunching>`
- `<Toast>`
- `<StatusPill>` (`pending|accepted|failed`)
- `<EmptyState>`

## Lists & Editors

- `<EntityList>` (drivers/vehicles)
- `<EntityEditorDrawer>` (form wrapper)
- `<ConfirmDialog>`

**Props docs:** Provide `value`, `onChange`, `error`, `helpText`, `aria-*` for all form inputs.

---
