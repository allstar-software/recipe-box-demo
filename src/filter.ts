import type { Recipe } from "./recipes";

/** The recipes whose title contains the query and that take at most `maxMinutes`. */
export function filterRecipes(all: Recipe[], query: string, maxMinutes: number | null): Recipe[] {
  const q = query.trim().toLowerCase();
  return all.filter(
    (r) => r.title.toLowerCase().includes(q) && (maxMinutes === null || r.minutes <= maxMinutes),
  );
}
