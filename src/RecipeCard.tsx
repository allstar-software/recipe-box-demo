import type { Recipe } from "./recipes";
import { StarButton } from "./StarButton";

export function RecipeCard({
  recipe,
  starred,
  onToggleStar,
  onOpen,
}: {
  recipe: Recipe;
  starred: boolean;
  onToggleStar: () => void;
  onOpen: () => void;
}) {
  return (
    <article className="card">
      <div className="card-head">
        <h2>
          <button type="button" className="card-title" onClick={onOpen}>
            {recipe.title}
          </button>
        </h2>
        <StarButton title={recipe.title} starred={starred} onToggle={onToggleStar} />
      </div>
      <p className="summary">{recipe.summary}</p>
      <footer>
        <span className="minutes">{recipe.minutes} min</span>
        <ul className="tags">
          {recipe.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </footer>
    </article>
  );
}
