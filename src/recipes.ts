export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};

export type Recipe = {
  id: string;
  title: string;
  minutes: number;
  servings: number;
  tags: string[];
  summary: string;
  ingredients: Ingredient[];
  steps: string[];
};

export const recipes: Recipe[] = [
  {
    id: "shakshuka",
    title: "Shakshuka",
    minutes: 30,
    servings: 2,
    tags: ["breakfast", "vegetarian"],
    summary: "Eggs poached in a spiced tomato and pepper sauce.",
    ingredients: [
      { name: "eggs", amount: 4, unit: "" },
      { name: "canned tomatoes", amount: 400, unit: "g" },
      { name: "red pepper", amount: 1, unit: "" },
      { name: "onion", amount: 1, unit: "" },
      { name: "cumin", amount: 1, unit: "tsp" },
      { name: "olive oil", amount: 2, unit: "tbsp" },
    ],
    steps: [
      "Soften the onion and pepper in the oil.",
      "Add the cumin and tomatoes and simmer for 10 minutes.",
      "Make wells, crack in the eggs, cover and cook until set.",
    ],
  },
  {
    id: "pad-thai",
    title: "Pad Thai",
    minutes: 25,
    servings: 2,
    tags: ["dinner", "noodles"],
    summary: "Rice noodles stir-fried with tamarind, peanuts and lime.",
    ingredients: [
      { name: "rice noodles", amount: 200, unit: "g" },
      { name: "eggs", amount: 2, unit: "" },
      { name: "tamarind paste", amount: 2, unit: "tbsp" },
      { name: "peanuts", amount: 50, unit: "g" },
      { name: "lime", amount: 1, unit: "" },
      { name: "spring onions", amount: 3, unit: "" },
    ],
    steps: [
      "Soak the noodles until soft.",
      "Scramble the eggs in a hot wok, then add the noodles and tamarind.",
      "Serve with peanuts, spring onions and lime.",
    ],
  },
  {
    id: "minestrone",
    title: "Minestrone",
    minutes: 45,
    servings: 4,
    tags: ["soup", "vegetarian"],
    summary: "Hearty Italian vegetable soup with beans and pasta.",
    ingredients: [
      { name: "onion", amount: 1, unit: "" },
      { name: "carrots", amount: 2, unit: "" },
      { name: "canned tomatoes", amount: 400, unit: "g" },
      { name: "cannellini beans", amount: 400, unit: "g" },
      { name: "small pasta", amount: 100, unit: "g" },
      { name: "vegetable stock", amount: 1, unit: "l" },
    ],
    steps: [
      "Soften the onion and carrots.",
      "Add the tomatoes, beans and stock and simmer for 20 minutes.",
      "Add the pasta and cook until tender.",
    ],
  },
  {
    id: "banana-bread",
    title: "Banana Bread",
    minutes: 70,
    servings: 8,
    tags: ["baking", "dessert"],
    summary: "Moist loaf made with overripe bananas and walnuts.",
    ingredients: [
      { name: "ripe bananas", amount: 3, unit: "" },
      { name: "flour", amount: 250, unit: "g" },
      { name: "butter", amount: 100, unit: "g" },
      { name: "sugar", amount: 150, unit: "g" },
      { name: "eggs", amount: 2, unit: "" },
      { name: "walnuts", amount: 60, unit: "g" },
    ],
    steps: [
      "Mash the bananas and beat in the butter, sugar and eggs.",
      "Fold in the flour and walnuts.",
      "Bake at 175°C for 55 minutes.",
    ],
  },
  {
    id: "greek-salad",
    title: "Greek Salad",
    minutes: 10,
    servings: 2,
    tags: ["salad", "vegetarian"],
    summary: "Tomatoes, cucumber, olives and feta with oregano.",
    ingredients: [
      { name: "tomatoes", amount: 3, unit: "" },
      { name: "cucumber", amount: 1, unit: "" },
      { name: "olives", amount: 80, unit: "g" },
      { name: "feta", amount: 150, unit: "g" },
      { name: "olive oil", amount: 2, unit: "tbsp" },
    ],
    steps: [
      "Chop the tomatoes and cucumber.",
      "Top with olives and feta, then dress with oil and oregano.",
    ],
  },
  {
    id: "chicken-curry",
    title: "Chicken Curry",
    minutes: 50,
    servings: 4,
    tags: ["dinner"],
    summary: "Tender chicken simmered in a creamy, fragrant sauce.",
    ingredients: [
      { name: "chicken thighs", amount: 600, unit: "g" },
      { name: "onion", amount: 2, unit: "" },
      { name: "curry paste", amount: 3, unit: "tbsp" },
      { name: "coconut milk", amount: 400, unit: "ml" },
      { name: "rice", amount: 300, unit: "g" },
    ],
    steps: [
      "Brown the chicken, then soften the onions in the same pan.",
      "Stir in the curry paste and coconut milk and simmer for 30 minutes.",
      "Serve with rice.",
    ],
  },
];
