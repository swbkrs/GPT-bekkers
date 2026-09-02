import assert from "node:assert/strict";
import {
  calculateFullService,
  calculateToGo,
} from "../src/lib/pricing.ts";

const delivery50 = calculateToGo({
  actualGuests: 50,
  menuPrice: 12.25,
  orderType: "Delivery",
});
assert.deepEqual(
  {
    menu: delivery50.menu,
    under100: delivery50.under100,
    delivery: delivery50.delivery,
    taxableSubtotal: delivery50.taxableSubtotal,
    tax: delivery50.tax,
    total: delivery50.total,
  },
  {
    menu: 612.5,
    under100: 100,
    delivery: 125,
    taxableSubtotal: 837.5,
    tax: 64.91,
    total: 902.41,
  },
);

const pickup50 = calculateToGo({
  actualGuests: 50,
  menuPrice: 12.25,
  orderType: "Pickup",
});
assert.deepEqual(
  {
    menu: pickup50.menu,
    under100: pickup50.under100,
    delivery: pickup50.delivery,
    taxableSubtotal: pickup50.taxableSubtotal,
    tax: pickup50.tax,
    total: pickup50.total,
  },
  {
    menu: 612.5,
    under100: 100,
    delivery: 0,
    taxableSubtotal: 712.5,
    tax: 55.22,
    total: 767.72,
  },
);

const delivery100 = calculateToGo({
  actualGuests: 100,
  menuPrice: 12.25,
  orderType: "Delivery",
});
assert.equal(delivery100.under100, 0);
assert.equal(delivery100.taxableSubtotal, 1350);
assert.equal(delivery100.tax, 104.63);
assert.equal(delivery100.total, 1454.63);

const cowboy40 = calculateFullService({
  actualGuests: 40,
  menuPrice: 31.99,
  minimum40: 2099,
});
assert.deepEqual(
  {
    food: cowboy40.food,
    labor: cowboy40.labor,
    gratuity: cowboy40.gratuity,
    tax: cowboy40.tax,
    total: cowboy40.total,
  },
  {
    food: 2099,
    labor: 524.75,
    gratuity: 393.56,
    tax: 233.84,
    total: 3251.15,
  },
);

console.log(
  JSON.stringify(
    {
      delivery50,
      pickup50,
      delivery100,
      cowboy40,
    },
    null,
    2,
  ),
);
