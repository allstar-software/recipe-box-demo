import { useState } from "react";
import type { Recipe } from "./recipes";

export function formatAmount(amount: number, unit: string): string {
  const rounded = Math.round(amount * 100) / 100;
  return unit ? `${rounded} ${unit}` : String(rounded);
}

export function RecipeDetail({ recipe, onBack }: { recipe: Recipe; onBack: () => void }) {
  const [servings, setServings] = useState(recipe.servings);

  function changeServings(next: number) {
    if (next < 1) return;
    const factor = next / recipe.servings;
    for (const ingredient of recipe.ingredients) {
      ingredient.amount = ingredient.amount * factor;
    }
    setServings(next);
  }

  return (
    <article className="detail">
      <button type="button" className="back" onClick={onBack}>
        ← All recipes
      </button>
      <h2>{recipe.title}</h2>
      <p className="summary">{recipe.summary}</p>
      <p className="meta">
        <span className="minutes">{recipe.minutes} min</span>
      </p>
      <div className="servings" role="group" aria-label="Servings">
        <button type="button" aria-label="Fewer servings" onClick={() => changeServings(servings - 1)}>
          −
        </button>
        <span>Serves {servings}</span>
        <button type="button" aria-label="More servings" onClick={() => changeServings(servings + 1)}>
          +
        </button>
      </div>
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
