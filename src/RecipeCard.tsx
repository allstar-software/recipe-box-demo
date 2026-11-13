import type { Recipe } from "./recipes";

export function RecipeCard({ recipe, onOpen }: { recipe: Recipe; onOpen: () => void }) {
  return (
    <article className="card">
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
    </article>
  );
}
