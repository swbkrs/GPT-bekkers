export type DietaryTag = "GF" | "V" | "Veg";

export type ToGoMenu = {
  id: number;
  category: string;
  name: string;
  price: number;
  summary: string;
  tags: DietaryTag[];
  choices?: string[];
  includedSides?: string[];
  customizableSides?: number;
  includesBread?: boolean;
  officeConfirm?: boolean;
};

const bbqDefaultSides = [
  "Famous BBQ Baked Beans",
  "Home Style Potato Salad",
  "Tangy Cole Slaw",
];

export const toGoMenus: ToGoMenu[] = [
  { id: 1, category: "BBQ", name: "BBQ Sandwiches", price: 12.25, summary: "BBQ beef or BBQ pulled pork sandwiches, baked beans and tangy cole slaw.", tags: [], choices: ["BBQ beef", "BBQ pulled pork"], includedSides: ["Famous BBQ Baked Beans", "Tangy Cole Slaw"] },
  { id: 2, category: "BBQ", name: "BBQ Chicken", price: 12.25, summary: "BBQ chicken, baked beans, tangy cole slaw, Rolls and Butter.", tags: [], includedSides: ["Famous BBQ Baked Beans", "Tangy Cole Slaw", "Rolls and Butter"], includesBread: true },
  { id: 3, category: "BBQ", name: "Deluxe BBQ Sandwiches", price: 14.25, summary: "BBQ beef or BBQ pulled pork sandwiches, baked beans, potato salad and tangy cole slaw.", tags: [], choices: ["BBQ beef", "BBQ pulled pork"], includedSides: bbqDefaultSides },
  { id: 4, category: "BBQ", name: "Charbroiled Boneless Chicken Thighs", price: 14, summary: "Chicken thighs, baked beans, tangy cole slaw, watermelon and Rolls and Butter.", tags: [], includedSides: ["Famous BBQ Baked Beans", "Tangy Cole Slaw", "Watermelon Wedges", "Rolls and Butter"], includesBread: true },
  { id: 5, category: "BBQ", name: "Backyard BBQ", price: 13.75, summary: "BBQ chicken or pulled pork, Texas Style BBQ Sauce, Rolls and Butter and three sides.", tags: [], choices: ["BBQ chicken", "Pulled pork"], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 6, category: "BBQ", name: "Tri Tip", price: 18.5, summary: "Tri tip, Texas Style BBQ Sauce, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 7, category: "BBQ", name: "BBQ Chicken & Pulled Pork", price: 17, summary: "BBQ chicken and pulled pork, Texas Style BBQ Sauce, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 8, category: "BBQ", name: "Tri Tip & BBQ Chicken", price: 21.75, summary: "Tri tip and BBQ chicken, Texas Style BBQ Sauce, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 9, category: "BBQ", name: "Tri Tip & Pulled Pork", price: 21.75, summary: "Tri tip and pulled pork, Texas Style BBQ Sauce, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 10, category: "BBQ", name: "Pork Spareribs", price: 17.5, summary: "Pork spareribs, Texas Style BBQ Sauce, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 11, category: "BBQ", name: "Baby Back Ribs", price: 17.5, summary: "Baby back ribs, Texas Style BBQ Sauce, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 12, category: "BBQ", name: "Tri Tip, BBQ Chicken & Pulled Pork", price: 27, summary: "Tri tip, BBQ chicken and pulled pork, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 13, category: "BBQ", name: "Spareribs & BBQ Combo", price: 20.75, summary: "Pork spareribs with BBQ chicken or pulled pork, Rolls and Butter and three sides.", tags: [], choices: ["BBQ chicken", "Pulled pork"], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 14, category: "BBQ", name: "Baby Back Ribs & BBQ Combo", price: 20.75, summary: "Baby back ribs with BBQ chicken or pulled pork, Rolls and Butter and three sides.", tags: [], choices: ["BBQ chicken", "Pulled pork"], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 15, category: "BBQ", name: "Pork Spareribs & Tri Tip", price: 25.5, summary: "Pork spareribs and tri tip, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 16, category: "BBQ", name: "Baby Back Ribs & Tri Tip", price: 25.5, summary: "Baby back ribs and tri tip, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 17, category: "BBQ", name: "Spareribs, Tri Tip & BBQ Chicken", price: 30.75, summary: "Pork spareribs, tri tip and BBQ chicken, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 18, category: "BBQ", name: "Baby Back Ribs, Tri Tip & BBQ Chicken", price: 30.75, summary: "Baby back ribs, tri tip and BBQ chicken, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },

  { id: 19, category: "Hawaiian", name: "Hawaiian Gathering", price: 13.75, summary: "Polynesian chicken or Kalua pork, tropical BBQ sauce, Rolls and Butter and three sides.", tags: [], choices: ["Polynesian chicken", "Kalua pork"], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 20, category: "Hawaiian", name: "Polynesian Chicken & Kalua Pork", price: 17, summary: "Polynesian chicken and Kalua pork, tropical BBQ sauce, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 21, category: "Hawaiian", name: "Hawaiian Spareribs & Polynesian Chicken", price: 20.75, summary: "Hawaiian style spareribs and Polynesian chicken, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 22, category: "Hawaiian", name: "Hawaiian Baby Back Ribs & Polynesian Chicken", price: 20.75, summary: "Hawaiian baby back ribs and Polynesian chicken, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 23, category: "Hawaiian", name: "Island Trio", price: 27, summary: "Pork spareribs, Polynesian chicken and coconut tilapia with mango salsa.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },

  { id: 24, category: "Traditional", name: "Roast Chicken Buffet", price: 13.75, summary: "Roast chicken or herb chicken breast in garlic sauce, Rolls and Butter and three sides.", tags: [], choices: ["Roast chicken", "Herb chicken breast in garlic sauce"], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 25, category: "Traditional", name: "Tri Tip Au Jus", price: 18.5, summary: "Tri tip au jus, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 26, category: "Traditional", name: "Tri Tip & Chicken", price: 22.75, summary: "Tri tip au jus with roast chicken or herb chicken breast, Rolls and Butter and three sides.", tags: [], choices: ["Roast chicken", "Herb chicken breast in garlic sauce"], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 27, category: "Traditional", name: "Chicken & Herb Encrusted Salmon", price: 21.75, summary: "Chicken breast, herb encrusted salmon, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },
  { id: 28, category: "Traditional", name: "Tri Tip, Chicken & Salmon", price: 31.75, summary: "Tri tip au jus, chicken breast, herb encrusted salmon, Rolls and Butter and three sides.", tags: [], includedSides: [...bbqDefaultSides, "Rolls and Butter"], customizableSides: 3, includesBread: true },

  { id: 29, category: "Mexican", name: "Chiquito Taco Bar", price: 15.25, summary: "One meat, refried beans, Mexican rice, chips, salsa, guacamole, tortillas and taco toppings.", tags: [], choices: ["Shredded beef taco meat", "Pollo asado", "Carnitas"], includedSides: ["Refried Beans", "Mexican Rice"] },
  { id: 30, category: "Mexican", name: "Vera Cruz", price: 17.99, summary: "Cheese enchiladas, beef taco bar, refried beans, Mexican rice and classic taco accompaniments.", tags: [], includedSides: ["Refried Beans", "Mexican Rice"] },
  { id: 31, category: "Mexican", name: "Cabo San Lucas", price: 19.99, summary: "Chicken fajitas, beef taco bar, refried beans, Mexican rice and classic taco accompaniments.", tags: [], includedSides: ["Refried Beans", "Mexican Rice"] },
  { id: 32, category: "Mexican", name: "Guadalajara", price: 20.99, summary: "Carne asada and pollo asado bar, refried beans, Mexican rice and classic taco accompaniments.", tags: [], includedSides: ["Refried Beans", "Mexican Rice"] },
  { id: 33, category: "Mexican", name: "Acapulco", price: 23.99, summary: "Carne asada, pollo asado, cheese enchiladas, refried beans, Mexican rice and taco accompaniments.", tags: [], includedSides: ["Refried Beans", "Mexican Rice"] },

  { id: 34, category: "Italian", name: "Sicily", price: 11.25, summary: "Chicken Alfredo farfalle, green beans amandine, Caesar salad and Rolls and Butter.", tags: [], includedSides: ["Green Beans Amandine", "Caesar Salad", "Rolls and Butter"], includesBread: true },
  { id: 35, category: "Italian", name: "Little Italy", price: 14.99, summary: "Roast chicken, penne Alfredo, Italian green beans, Caesar salad and Rolls and Butter.", tags: [], includedSides: ["Penne Pasta in Alfredo Sauce", "Italian Green Beans", "Caesar Salad", "Rolls and Butter"], includesBread: true },
  { id: 36, category: "Italian", name: "Mona Lisa", price: 16.99, summary: "Chicken piccata, roasted potatoes, grilled Italian vegetables, mixed greens and focaccia.", tags: [], includedSides: ["Roasted Yukon Gold Potatoes", "Grilled Mediterranean Vegetables", "Mixed Greens Salad", "Herb Focaccia"] },
  { id: 37, category: "Italian", name: "Arrivederci", price: 24.99, summary: "Herb tri tip au jus, chicken piccata, roasted potatoes, roasted cauliflower, spinach and pear salad and artisan rolls.", tags: [], includedSides: ["Roasted Yukon Gold Potatoes", "Roasted Cauliflower", "Spinach & Pear Salad", "Artisan Rolls"] },

  { id: 38, category: "Greek", name: "Budget Greek", price: 13.5, summary: "Greek chicken, Greek rice, Greek salad, tzatziki, pita bread and hummus.", tags: [], includedSides: ["Greek Rice", "Greek Salad"] },
  { id: 39, category: "Greek", name: "Simply Greek", price: 15.99, summary: "Lemon pepper chicken, Greek rice, Greek salad, fruit salad, tzatziki, pita bread and hummus.", tags: [], includedSides: ["Greek Rice", "Greek Salad", "Fresh Fruit Salad"] },
  { id: 40, category: "Greek", name: "Athens", price: 15.99, summary: "Gyros bar, Greek rice, Greek salad, fruit salad, tzatziki, pita bread and hummus.", tags: [], includedSides: ["Greek Rice", "Greek Salad", "Fresh Fruit Salad"] },
  { id: 41, category: "Greek", name: "Grecian Delight", price: 20.99, summary: "Lemon pepper chicken, gyros bar, Greek rice, Greek salad, fruit salad, tzatziki and hummus.", tags: [], includedSides: ["Greek Rice", "Greek Salad", "Fresh Fruit Salad"] },

  { id: 42, category: "Lunch", name: "Scrumptious Sandwiches", price: 15.5, summary: "Chicken salad and turkey ciabatta sandwiches, fresh fruit tray, potato salad and pasta salad.", tags: [], includedSides: ["Fresh Fruit Tray", "Home Style Potato Salad", "Pasta Salad Vinaigrette"] },
  { id: 43, category: "Breakfast", name: "Continental Breakfast", price: 14.5, summary: "Danish, cinnamon rolls, muffins, artisan baguettes and cheese, bagels and cream cheese, fresh fruit.", tags: [], includedSides: ["Fresh Fruit Tray"] },
  { id: 44, category: "Breakfast", name: "Basic Breakfast", price: 16.5, summary: "Vegetable and cheese egg frittata, bacon, assorted pastries and fresh fruit.", tags: [], includedSides: ["Fresh Fruit Tray"] },

  { id: 45, category: "Seasonal", name: "Family Value Holiday Menu", price: 18.99, summary: "Turkey, ham, mashed potatoes, gravy, bread dressing, green bean casserole, cranberry sauce and Rolls and Butter.", tags: [], includedSides: ["Mashed Potatoes with Beef Gravy", "Cornbread Dressing (Stuffing)", "Green Bean Casserole", "Rolls and Butter"], includesBread: true },
  { id: 46, category: "Seasonal", name: "Irish Special", price: 18.99, summary: "Corned beef, cabbage, red potatoes, green salad, rye bread and mustards.", tags: [], includedSides: ["Roasted Yukon Gold Potatoes", "Traditional Green Salad"] },
  { id: 47, category: "Seasonal", name: "German Oktoberfest", price: 15.99, summary: "Bratwurst, seeded buns, sauerkraut, onions, mustards, hot German potato salad, green beans and green salad.", tags: [], includedSides: ["Hot German Potato Salad", "Green Beans Amandine", "Traditional Green Salad"] },
  { id: 48, category: "Seasonal", name: "Down in the Bayou", price: 19.99, summary: "Cajun chicken, pulled pork, Southern BBQ sauce, confetti rice, red beans and sausage, green salad, fruit and cornbread.", tags: [], includedSides: ["Red Beans and Andouille Sausage", "Traditional Green Salad", "Fresh Fruit Salad"] },
  { id: 49, category: "Seasonal", name: "Beautiful Bermuda", price: 18.25, summary: "Jerk chicken, pulled pork, jerk sauce, white rice, black beans, Caribbean coleslaw and cornbread.", tags: [], includedSides: ["White Rice", "Black Beans", "Hawaiian Cole Slaw"] },
  { id: 50, category: "Appetizers", name: "Create an Appetizer Menu", price: 15.5, summary: "Choose a combination from Bekker’s published appetizer selections. Sales will confirm the final combination.", tags: [], officeConfirm: true },
];

export const toGoCategories = [
  "Featured",
  ...Array.from(new Set(toGoMenus.map((menu) => menu.category))),
];

export const featuredToGoIds = new Set([1, 5, 24, 29, 34, 42]);
