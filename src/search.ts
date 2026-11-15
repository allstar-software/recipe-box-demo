import type { Recipe } from "./recipes";

export type Match = { ingredients: string[]; tags: string[] };

function unique(values: string[]): string[] {
  const seen = new Set<string>();
  return values.filter((v) => {
    const key = v.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** null: no match. Otherwise what matched besides the name (empty when the name matches). */
export function matchRecipe(recipe: Recipe, query: string): Match | null {
  const q = query.trim().toLowerCase();
  if (q === "" || recipe.title.toLowerCase().includes(q)) {
    return { ingredients: [], tags: [] };
  }
  const ingredients = unique(
    recipe.ingredients.map((i) => i.name).filter((n) => n.toLowerCase().includes(q)),
  );
  const tags = unique(recipe.tags.filter((t) => t.toLowerCase().includes(q)));
  if (ingredients.length === 0 && tags.length === 0) return null;
  return { ingredients, tags };
}

export function matchNote(m: Match): string | null {
  const parts: string[] = [];
  if (m.ingredients.length > 0) parts.push(`Ingredient: ${m.ingredients.join(", ")}`);
  if (m.tags.length > 0) parts.push(`Tag: ${m.tags.join(", ")}`);
  return parts.length > 0 ? parts.join(" · ") : null;
}
