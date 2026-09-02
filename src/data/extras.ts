export type Extra = {
  id: string;
  group: "Desserts" | "Beverages" | "Appetizers" | "Place settings" | "Delivery supplies";
  name: string;
  price: number;
  unit: "person" | "flat";
  description: string;
  tags?: Array<"GF" | "V" | "Veg">;
};

export const toGoExtras: Extra[] = [
  { id: "cookies", group: "Desserts", name: "Assorted Homemade Cookies", price: 2.75, unit: "person", description: "Bekker’s assorted homemade cookies.", tags: ["Veg"] },
  { id: "brownies", group: "Desserts", name: "Chocolate Fudge Brownies", price: 2.75, unit: "person", description: "Chocolate fudge brownies.", tags: ["Veg"] },
  { id: "cobbler", group: "Desserts", name: "Homemade Fruit Cobbler", price: 3, unit: "person", description: "Peach, apple or Dutch apple; choose one flavor.", tags: ["Veg"] },
  { id: "dessert-bars", group: "Desserts", name: "Chewy Dessert Bar Assortment", price: 3.75, unit: "person", description: "Bekker’s published chewy dessert bar assortment.", tags: ["Veg"] },
  { id: "mini-pastries", group: "Desserts", name: "Assortment of Mini Pastries", price: 6, unit: "person", description: "Mini eclairs, cookies, brownies, macarons, cheesecake bites and Rice Krispy treats.", tags: ["Veg"] },

  { id: "water", group: "Beverages", name: "Bottled Water", price: 2.75, unit: "person", description: "In a disposable box with ice." },
  { id: "sodas", group: "Beverages", name: "Sodas", price: 3.5, unit: "person", description: "In a disposable box with ice." },
  { id: "cold-beverage", group: "Beverages", name: "Lemonade, Iced Tea, Fruit Punch or Orange Juice", price: 3.5, unit: "person", description: "Choose one. Includes disposable cups, beverage napkins and condiments." },
  { id: "coffee", group: "Beverages", name: "Coffee", price: 4, unit: "person", description: "Decaf by request. Includes cups with lids, beverage napkins and condiments." },
  { id: "coffee-tea", group: "Beverages", name: "Coffee & Hot Tea", price: 4.5, unit: "person", description: "Includes cups with lids, beverage napkins and condiments." },

  { id: "chips-salsa", group: "Appetizers", name: "Tortilla Chips and Fresh Salsa", price: 2.25, unit: "person", description: "Minimum 50 guests per item.", tags: ["GF", "V"] },
  { id: "caprese", group: "Appetizers", name: "Mini Caprese Skewers", price: 2.25, unit: "person", description: "Fresh mozzarella, grape tomatoes, basil and balsamic drizzle.", tags: ["GF", "Veg"] },
  { id: "teriyaki-chicken-skewers", group: "Appetizers", name: "Mini Chicken Teriyaki Skewers", price: 2.5, unit: "person", description: "Minimum 50 guests per item." },
  { id: "bbq-sliders", group: "Appetizers", name: "Awesome BBQ Sliders", price: 3.5, unit: "person", description: "Shredded BBQ beef or pork in Texas Style BBQ sauce on brioche buns." },
  { id: "chicken-wings", group: "Appetizers", name: "Chicken Wings", price: 4, unit: "person", description: "Hot ’n spicy, lemon pepper or BBQ.", tags: ["GF"] },
  { id: "charcuterie", group: "Appetizers", name: "Charcuterie Tray", price: 8, unit: "person", description: "Artisan meats and cheeses, fruit, accompaniments, breads, crackers and crisps." },

  { id: "bio-place-settings", group: "Place settings", name: "Biodegradable Plates, Plasticware and Napkins", price: 1.25, unit: "person", description: "One disposable place setting per billed guest." },
  { id: "upgraded-place-settings", group: "Place settings", name: "Upgraded Hard Plastic Plates, Plasticware and Napkins", price: 2, unit: "person", description: "Black, white, clear, lattice or bamboo options; office confirms finish." },
  { id: "serving-utensils", group: "Delivery supplies", name: "Serving Utensils Package", price: 30, unit: "flat", description: "Plastic serving utensils." },
  { id: "equipment-package", group: "Delivery supplies", name: "Disposable Equipment Package", price: 100, unit: "flat", description: "Four wire chafing stands, foil pans, Sternos and plastic serving utensils." },
];

export const fullServiceExtras: Extra[] = [
  { id: "fs-cookies", group: "Desserts", name: "Assorted Homemade Cookies", price: 2.5, unit: "person", description: "Published Full Service add-on price.", tags: ["Veg"] },
  { id: "fs-brownies", group: "Desserts", name: "Chocolate Brownies", price: 2.5, unit: "person", description: "Published Full Service add-on price.", tags: ["Veg"] },
  { id: "fs-cobbler", group: "Desserts", name: "Homemade Cobbler", price: 3, unit: "person", description: "Peach, apple or Dutch apple; choose one flavor.", tags: ["Veg"] },
  { id: "fs-cookie-brownie", group: "Desserts", name: "Cookies and Brownies", price: 3.5, unit: "person", description: "Published Full Service add-on price.", tags: ["Veg"] },
  { id: "fs-fruit-display", group: "Desserts", name: "Elegant Fresh Fruit Display", price: 4, unit: "person", description: "Published Full Service add-on price.", tags: ["GF", "V"] },
];
