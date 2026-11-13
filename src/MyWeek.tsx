import type { Recipe } from "./recipes";
import type { ShoppingLine } from "./week";
import { formatAmount } from "./RecipeDetail";

export function MyWeek({
  recipes,
  list,
  onOpen,
  onRemove,
  onBrowse,
}: {
  recipes: Recipe[];
  list: ShoppingLine[];
  onOpen: (id: string) => void;
  onRemove: (id: string) => void;
  onBrowse: () => void;
}) {
  if (recipes.length === 0) {
    return (
      <div>
        <p className="empty">Your week is empty. Add recipes from the list to build a shopping list.</p>
        <button type="button" className="back" onClick={onBrowse}>
          Browse recipes
        </button>
      </div>
    );
  }
  return (
    <div className="week-layout">
      <section className="week-list">
        <h2>Recipes this week</h2>
        <ul>
          {recipes.map((r) => (
            <li key={r.id}>
              <button type="button" className="card-title" onClick={() => onOpen(r.id)}>
                {r.title}
              </button>
              <button type="button" className="back" onClick={() => onRemove(r.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className="shopping">
        <h2>Shopping list</h2>
        <ul>
          {list.map((l) => (
            <li key={JSON.stringify([l.name, l.unit])}>
              <span className="amount">{formatAmount(l.amount, l.unit)}</span> {l.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
