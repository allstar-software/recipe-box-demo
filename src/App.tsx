import { useState } from "react";
import { recipes } from "./recipes";
import { RecipeCard } from "./RecipeCard";
import { RecipeDetail } from "./RecipeDetail";
import { MyWeek } from "./MyWeek";
import { loadWeek, saveWeek, shoppingList, toggleWeek } from "./week";

function initialWeek(): string[] {
  try {
    return loadWeek(window.localStorage, recipes);
  } catch {
    return [];
  }
}

function persistWeek(ids: string[]) {
  try {
    saveWeek(window.localStorage, ids);
  } catch {
    // storage unavailable
  }
}

const TIME_LIMITS = [15, 20, 30, 45];

export function App() {
  const [query, setQuery] = useState("");
  const [maxMinutes, setMaxMinutes] = useState<number | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [week, setWeek] = useState<string[]>(initialWeek);
  const [view, setView] = useState<"recipes" | "week">("recipes");
  const [openFrom, setOpenFrom] = useState<"recipes" | "week">("recipes");
  const open = recipes.find((r) => r.id === openId);
  const weekRecipes = week.flatMap((id) => recipes.filter((r) => r.id === id));
  const toggle = (id: string) => {
    const next = toggleWeek(week, id);
    persistWeek(next);
    setWeek(next);
  };
  const show = (v: "recipes" | "week") => {
    setOpenId(null);
    setView(v);
  };
  const openRecipe = (id: string, from: "recipes" | "week") => {
    setOpenFrom(from);
    setOpenId(id);
  };
  const q = query.trim();
  const shown = recipes.filter(
    (r) =>
      r.title.toLowerCase().includes(q.toLowerCase()) &&
      (maxMinutes === null || r.minutes <= maxMinutes),
  );

  return (
    <div className="app">
      <header className="header">
        <h1>Recipe Box</h1>
        <nav>
          <button
            type="button"
            aria-current={!open && view === "recipes" ? "page" : undefined}
            onClick={() => show("recipes")}
          >
            Recipes
          </button>
          <button
            type="button"
            aria-current={!open && view === "week" ? "page" : undefined}
            onClick={() => show("week")}
          >
            My week ({week.length})
          </button>
        </nav>
      </header>
      <main>
        {open ? (
          <RecipeDetail
            recipe={open}
            onBack={() => show(openFrom)}
            backLabel={openFrom === "week" ? "← My week" : "← All recipes"}
            inWeek={week.includes(open.id)}
            onToggleWeek={() => toggle(open.id)}
          />
        ) : view === "week" ? (
          <MyWeek
            recipes={weekRecipes}
            list={shoppingList(week, recipes)}
            onOpen={(id) => openRecipe(id, "week")}
            onRemove={toggle}
            onBrowse={() => show("recipes")}
          />
        ) : (
        <>
        <div className="filters">
          <input
            className="search"
            type="search"
            placeholder="Search recipes"
            aria-label="Search recipes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <label className="time-filter">
            Max time{" "}
            <select
              value={maxMinutes === null ? "" : String(maxMinutes)}
              onChange={(e) =>
                setMaxMinutes(e.target.value === "" ? null : Number(e.target.value))
              }
            >
              <option value="">Any time</option>
              {TIME_LIMITS.map((n) => (
                <option key={n} value={n}>
                  Up to {n} min
                </option>
              ))}
            </select>
          </label>
        </div>
        {shown.length === 0 ? (
          <p className="empty">
            {q && maxMinutes !== null
              ? `No recipes match “${q}” within ${maxMinutes} minutes.`
              : q
                ? `No recipes match “${q}”.`
                : `No recipes take ${maxMinutes} minutes or less.`}
          </p>
        ) : (
          <section className="grid">
            {shown.map((r) => (
              <RecipeCard
                key={r.id}
                recipe={r}
                onOpen={() => openRecipe(r.id, "recipes")}
                inWeek={week.includes(r.id)}
                onToggleWeek={() => toggle(r.id)}
              />
            ))}
          </section>
        )}
        </>
        )}
      </main>
    </div>
  );
}
