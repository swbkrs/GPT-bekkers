# Bekker’s Catering

A new, Vercel-native website for Bekker’s Catering in San Diego. The site gives guests three clear paths: Delivery, Pickup / To Go, and Full Service.

## Product paths

- `/` — editorial homepage and three service doors
- `/to-go?orderType=Delivery` — Delivery estimate flow
- `/to-go?orderType=Pickup` — Pickup / To Go estimate flow
- `/full-service` — Full Service inquiry and estimate

The estimators are proposals only. They do not send email or collect card details.

## Locked pricing rules

To Go uses a 50-guest billing minimum, adds $2 per billed guest below 100, adds the starting $125 delivery fee only for Delivery, and taxes the complete taxable subtotal at 7.75%.

Full Service applies the stack in this order: food, equipment and labor at 25% of food, required gratuity at 15% of food plus labor, then 7.75% tax on food plus labor plus gratuity.

Run the acceptance cases with:

```bash
npm run audit:pricing
```

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run build
```

Menu names, published prices, descriptions, dietary markers, and photography are sourced from [bekkerscatering.com](https://www.bekkerscatering.com/). Unknown policy and unpublished pricing are directed to 619-287-9027.
