import type { Recipe } from "./recipes";
import { WeekToggle } from "./WeekToggle";

export function formatAmount(amount: number, unit: string): string {
  const rounded = Math.round(amount * 100) / 100;
  return unit ? `${rounded} ${unit}` : String(rounded);
}

export function RecipeDetail({
  recipe,
  onBack,
  backLabel = "← All recipes",
  inWeek,
  onToggleWeek,
}: {
  recipe: Recipe;
  onBack: () => void;
  backLabel?: string;
  inWeek: boolean;
  onToggleWeek: () => void;
}) {
  return (
    <article className="detail">
      <button type="button" className="back" onClick={onBack}>
        {backLabel}
      </button>
      <h2>{recipe.title}</h2>
      <p className="summary">{recipe.summary}</p>
      <p className="meta">
        <span className="minutes">{recipe.minutes} min</span> · Serves {recipe.servings}
      </p>
      <WeekToggle inWeek={inWeek} onToggle={onToggleWeek} />
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
