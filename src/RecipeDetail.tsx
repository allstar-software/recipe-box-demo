import type { Recipe } from "./recipes";
import { StarButton } from "./StarButton";

export function formatAmount(amount: number, unit: string): string {
  const rounded = Math.round(amount * 100) / 100;
  return unit ? `${rounded} ${unit}` : String(rounded);
}

export function RecipeDetail({
  recipe,
  starred,
  onToggleStar,
  onBack,
}: {
  recipe: Recipe;
  starred: boolean;
  onToggleStar: () => void;
  onBack: () => void;
}) {
  return (
    <article className="detail">
      <button type="button" className="back" onClick={onBack}>
        ← All recipes
      </button>
      <div className="detail-head">
        <h2>{recipe.title}</h2>
        <StarButton title={recipe.title} starred={starred} onToggle={onToggleStar} />
      </div>
      <p className="summary">{recipe.summary}</p>
      <p className="meta">
        <span className="minutes">{recipe.minutes} min</span> · Serves {recipe.servings}
      </p>
      <h3>Ingredients</h3>
      <ul className="ingredients">
        {recipe.ingredients.map((i) => (
          <li key={i.name}>
            <span className="amount">{formatAmount(i.amount, i.unit)}</span> {i.name}
          </li>
        ))}
      </ul>
      <h3>Method</h3>
      <ol className="steps">
        {recipe.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </article>
  );
}
