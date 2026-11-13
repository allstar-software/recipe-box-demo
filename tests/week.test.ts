import { test } from "node:test";
import assert from "node:assert/strict";
import { loadWeek, saveWeek, toggleWeek, shoppingList, WEEK_KEY } from "../src/week.ts";
import { recipes } from "../src/recipes.ts";
import type { Recipe } from "../src/recipes.ts";

function fakeStorage(initial?: string) {
  const data = new Map<string, string>();
  if (initial !== undefined) data.set(WEEK_KEY, initial);
  return {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
  };
}

const synth = (id: string, ingredients: Recipe["ingredients"]): Recipe => ({
  id, title: id, minutes: 1, servings: 1, tags: [], summary: "", ingredients, steps: [],
});

test("toggleWeek adds then removes, never duplicates", () => {
  const added = toggleWeek([], "a");
  assert.deepEqual(added, ["a"]);
  assert.deepEqual(toggleWeek(added, "a"), []);
  assert.deepEqual(toggleWeek(toggleWeek(["b"], "a"), "a"), ["b"]);
  assert.deepEqual(toggleWeek(["a", "b"], "c"), ["a", "b", "c"]);
});

test("shoppingList sums same ingredient across recipes", () => {
  const a = synth("a", [{ name: "onion", amount: 1, unit: "" }, { name: "canned tomatoes", amount: 400, unit: "g" }]);
  const b = synth("b", [{ name: "onion", amount: 1, unit: "" }, { name: "canned tomatoes", amount: 400, unit: "g" }]);
  assert.deepEqual(shoppingList(["a", "b"], [a, b]), [
    { name: "onion", amount: 2, unit: "" },
    { name: "canned tomatoes", amount: 800, unit: "g" },
  ]);
});

test("shoppingList with real recipes sums onion and tomatoes", () => {
  const withBoth = recipes.filter((r) =>
    r.ingredients.some((i) => i.name === "onion" && i.unit === ""),
  );
  assert.ok(withBoth.length >= 2);
  const list = shoppingList(withBoth.map((r) => r.id), recipes);
  const onion = list.find((l) => l.name === "onion" && l.unit === "");
  const expected = withBoth.reduce(
    (n, r) => n + r.ingredients.filter((i) => i.name === "onion" && i.unit === "").reduce((m, i) => m + i.amount, 0),
    0,
  );
  assert.equal(onion?.amount, expected);
  assert.ok(expected >= 2);
});

test("different units and different names stay separate", () => {
  const a = synth("a", [{ name: "flour", amount: 100, unit: "g" }, { name: "onion", amount: 1, unit: "" }]);
  const b = synth("b", [{ name: "flour", amount: 2, unit: "cup" }, { name: "spring onions", amount: 3, unit: "" }]);
  const list = shoppingList(["a", "b"], [a, b]);
  assert.equal(list.length, 4);
  assert.ok(list.some((l) => l.name === "flour" && l.unit === "g" && l.amount === 100));
  assert.ok(list.some((l) => l.name === "flour" && l.unit === "cup" && l.amount === 2));
  assert.ok(list.some((l) => l.name === "onion" && l.amount === 1));
  assert.ok(list.some((l) => l.name === "spring onions" && l.amount === 3));
});

test("empty week gives empty list", () => {
  assert.deepEqual(shoppingList([], recipes), []);
});

test("saveWeek then loadWeek round-trips order", () => {
  const s = fakeStorage();
  const ids = [recipes[2].id, recipes[0].id];
  saveWeek(s, ids);
  assert.deepEqual(loadWeek(s, recipes), ids);
});

test("loadWeek tolerates missing, corrupt, wrong-shaped and throwing storage", () => {
  assert.deepEqual(loadWeek(fakeStorage(), recipes), []);
  assert.deepEqual(loadWeek(fakeStorage("{"), recipes), []);
  assert.deepEqual(loadWeek(fakeStorage('{"a":1}'), recipes), []);
  const throwing = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
  assert.deepEqual(loadWeek(throwing, recipes), []);
  assert.doesNotThrow(() => saveWeek(throwing, ["x"]));
});

test("loadWeek drops unknown ids, non-strings and duplicates", () => {
  const id = recipes[0].id;
  const s = fakeStorage(JSON.stringify([id, "gone", 5, null, id]));
  assert.deepEqual(loadWeek(s, recipes), [id]);
});
