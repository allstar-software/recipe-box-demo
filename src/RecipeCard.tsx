import type { Recipe } from "./recipes";
import { WeekToggle } from "./WeekToggle";

export function RecipeCard({
  recipe,
  onOpen,
  inWeek,
  onToggleWeek,
}: {
  recipe: Recipe;
  onOpen: () => void;
  inWeek: boolean;
  onToggleWeek: () => void;
}) {
  return (
    <article className={inWeek ? "card in-week" : "card"}>
      <h2>
        <button type="button" className="card-title" onClick={onOpen}>
          {recipe.title}
        </button>
      </h2>
      <p className="summary">{recipe.summary}</p>
      <footer>
        <span className="minutes">{recipe.minutes} min</span>
        <ul className="tags">
          {recipe.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </footer>
      <WeekToggle inWeek={inWeek} onToggle={onToggleWeek} />
    </article>
  );
}
