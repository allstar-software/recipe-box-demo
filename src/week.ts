import type { Recipe } from "./recipes";

export const WEEK_KEY = "recipe-box-week";

export type ShoppingLine = { name: string; amount: number; unit: string };

type Store = Pick<Storage, "getItem" | "setItem">;

export function loadWeek(storage: Store, recipes: Recipe[]): string[] {
  try {
    const raw = storage.getItem(WEEK_KEY);
    if (raw === null) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const known = new Set(recipes.map((r) => r.id));
    const seen = new Set<string>();
    const ids: string[] = [];
    for (const v of parsed) {
      if (typeof v === "string" && known.has(v) && !seen.has(v)) {
        seen.add(v);
        ids.push(v);
      }
    }
    return ids;
  } catch {
    return [];
  }
}

export function saveWeek(storage: Store, ids: string[]): void {
  try {
    storage.setItem(WEEK_KEY, JSON.stringify(ids));
  } catch {
    // storage full or unavailable: the week still works for this session
  }
}

export function toggleWeek(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
}

export function shoppingList(ids: string[], recipes: Recipe[]): ShoppingLine[] {
  const lines = new Map<string, ShoppingLine>();
  for (const id of new Set(ids)) {
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) continue;
    for (const i of recipe.ingredients) {
      const key = JSON.stringify([i.name, i.unit]);
      const line = lines.get(key);
      if (line) line.amount += i.amount;
      else lines.set(key, { name: i.name, amount: i.amount, unit: i.unit });
    }
  }
  return [...lines.values()];
}
