import { describe, expect, it } from "vitest";
import { recipes, type Recipe } from "./recipes";
import { matchNote, matchRecipe } from "./search";

const base: Recipe = {
  id: "x",
  title: "Pad Thai",
  minutes: 20,
  servings: 2,
  tags: ["noodles", "Noodles", "vegetarian"],
  summary: "",
  ingredients: [
    { name: "rice noodles", amount: 200, unit: "g" },
    { name: "Canned Tomatoes", amount: 1, unit: "" },
    { name: "canned tomatoes", amount: 1, unit: "" },
    { name: "eggs", amount: 2, unit: "" },
  ],
  steps: [],
};

describe("matchRecipe", () => {
  it("name match gives an empty match and no note", () => {
    const m = matchRecipe(base, "pad");
    expect(m).toEqual({ ingredients: [], tags: [] });
    expect(matchNote(m!)).toBeNull();
  });
  it("matches ingredients", () => {
    expect(matchRecipe(base, "tomato")).toEqual({ ingredients: ["Canned Tomatoes"], tags: [] });
  });
  it("matches tags", () => {
    expect(matchRecipe(base, "vegetarian")).toEqual({ ingredients: [], tags: ["vegetarian"] });
  });
  it("returns null with no match", () => {
    expect(matchRecipe(base, "zzz")).toBeNull();
  });
  it("ignores case and surrounding spaces", () => {
    expect(matchRecipe(base, "  ToMaTo ")).toEqual(matchRecipe(base, "tomato"));
  });
  it("name plus ingredient match shows no note", () => {
    const m = matchRecipe({ ...base, title: "Tomato Soup" }, "tomato");
    expect(matchNote(m!)).toBeNull();
  });
  it("joins several matches without duplicates", () => {
    const m = matchRecipe(base, "noodle")!;
    expect(matchNote(m)).toBe("Ingredient: rice noodles · Tag: noodles");
  });
  it("empty or blank query matches everything with no note", () => {
    for (const r of recipes) {
      for (const q of ["", "   "]) {
        const m = matchRecipe(r, q);
        expect(m).not.toBeNull();
        expect(matchNote(m!)).toBeNull();
      }
    }
  });
  it("finds tomato recipes in the seed data", () => {
    const titles = recipes.filter((r) => matchRecipe(r, "tomato")).map((r) => r.title);
    expect(titles).toEqual(expect.arrayContaining(["Shakshuka", "Minestrone", "Greek Salad"]));
  });
});
