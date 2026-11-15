# Recipe Box

A small React app for browsing recipes: search them, filter by how long they take, and open one to see its ingredients and method.

    npm install
    npm run dev      # http://localhost:5173

Or with Docker: `docker compose up`.

## Recipe photos

Photos live in `public/photos/` and each recipe points to its file with the optional `photo` field in `src/recipes.ts` (for example `photos/shakshuka.svg`). The bundled images are simple illustrations; to use real photos, drop in files and update the `photo` paths. A recipe with no photo, or one that fails to load, shows a neutral tile.
