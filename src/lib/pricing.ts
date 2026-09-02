import type { Extra } from "@/data/extras";

export const TAX_RATE = 0.0775;
export const TO_GO_MINIMUM = 50;
export const FULL_SERVICE_MINIMUM = 40;
export const UNDER_100_ADJUSTMENT = 2;
export const DELIVERY_FEE = 125;

export type SelectedExtra = Extra & { quantity?: number };

export function roundCurrency(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function extrasTotal(extras: SelectedExtra[], billedGuests: number) {
  return roundCurrency(
    extras.reduce((sum, extra) => {
      const multiplier = extra.unit === "person" ? billedGuests : 1;
      return sum + extra.price * multiplier * (extra.quantity ?? 1);
    }, 0),
  );
}

export function calculateToGo(input: {
  actualGuests: number;
  menuPrice: number;
  orderType: "Delivery" | "Pickup";
  extras?: SelectedExtra[];
  sideUpgradePerPerson?: number;
}) {
  const actualGuests = Math.max(1, Math.floor(input.actualGuests || 1));
  const billedGuests = Math.max(TO_GO_MINIMUM, actualGuests);
  const menu = roundCurrency(input.menuPrice * billedGuests);
  const under100 =
    billedGuests < 100
      ? roundCurrency(UNDER_100_ADJUSTMENT * billedGuests)
      : 0;
  const sideUpgrades = roundCurrency(
    (input.sideUpgradePerPerson ?? 0) * billedGuests,
  );
  const extras = extrasTotal(input.extras ?? [], billedGuests);
  const delivery = input.orderType === "Delivery" ? DELIVERY_FEE : 0;
  const taxableSubtotal = roundCurrency(
    menu + under100 + sideUpgrades + extras + delivery,
  );
  const tax = roundCurrency(taxableSubtotal * TAX_RATE);
  const total = roundCurrency(taxableSubtotal + tax);

  return {
    actualGuests,
    billedGuests,
    menu,
    under100,
    sideUpgrades,
    extras,
    delivery,
    taxableSubtotal,
    tax,
    total,
  };
}

export function calculateFullService(input: {
  actualGuests: number;
  menuPrice: number;
  minimum40: number;
  extras?: SelectedExtra[];
}) {
  const actualGuests = Math.max(1, Math.floor(input.actualGuests || 1));
  const billedGuests = Math.max(FULL_SERVICE_MINIMUM, actualGuests);
  const menuFood = roundCurrency(
    Math.max(input.minimum40, input.menuPrice * billedGuests),
  );
  const extraFood = extrasTotal(input.extras ?? [], billedGuests);
  const food = roundCurrency(menuFood + extraFood);
  const labor = roundCurrency(food * 0.25);
  const gratuityBase = roundCurrency(food + labor);
  const gratuity = roundCurrency(gratuityBase * 0.15);
  const taxBase = roundCurrency(food + labor + gratuity);
  const tax = roundCurrency(taxBase * TAX_RATE);
  const total = roundCurrency(food + labor + gratuity + tax);

  return {
    actualGuests,
    billedGuests,
    menuFood,
    extraFood,
    food,
    labor,
    gratuityBase,
    gratuity,
    taxBase,
    tax,
    total,
  };
}
