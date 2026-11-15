import { useState } from "react";
import { recipes } from "./recipes";
import { RecipeCard } from "./RecipeCard";
import { RecipeDetail } from "./RecipeDetail";
import { getStorage, loadFavourites, saveFavourites, starredFirst } from "./favourites";

const TIME_LIMITS = [15, 20, 30, 45];

export function App() {
  const [query, setQuery] = useState("");
  const [maxMinutes, setMaxMinutes] = useState<number | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [favourites, setFavourites] = useState<Set<string>>(() =>
    loadFavourites(getStorage(), new Set(recipes.map((r) => r.id))),
  );
  const toggleFavourite = (id: string) => {
    const next = new Set(favourites);
    if (!next.delete(id)) next.add(id);
    setFavourites(next);
    saveFavourites(getStorage(), next);
  };
  const open = recipes.find((r) => r.id === openId);
  const q = query.trim();
  const filtered = recipes.filter(
    (r) =>
      r.title.toLowerCase().includes(q.toLowerCase()) &&
      (maxMinutes === null || r.minutes <= maxMinutes),
  );
  const shown = starredFirst(filtered, (r) => favourites.has(r.id));

  return (
    <div className="app">
      <header className="header">
        <h1>Recipe Box</h1>
      </header>
      <main>
        {open ? (
          <RecipeDetail
            recipe={open}
            starred={favourites.has(open.id)}
            onToggleStar={() => toggleFavourite(open.id)}
            onBack={() => setOpenId(null)} />
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
                starred={favourites.has(r.id)}
                onToggleStar={() => toggleFavourite(r.id)}
                onOpen={() => setOpenId(r.id)}
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
