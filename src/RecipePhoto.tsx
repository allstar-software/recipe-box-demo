import { useState } from "react";
import type { Recipe } from "./recipes";

export function RecipePhoto({ recipe, variant }: { recipe: Recipe; variant: "card" | "detail" }) {
  const [failed, setFailed] = useState(false);
  // On cards the title sits right below, so the image is decorative.
  const alt = variant === "card" ? "" : recipe.title;
  return (
    <div className={"photo-frame photo-" + variant}>
      {recipe.photo && !failed ? (
        <img
          className="photo"
          src={import.meta.env.BASE_URL + recipe.photo}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="photo photo-fallback" aria-hidden="true" />
      )}
    </div>
  );
}
