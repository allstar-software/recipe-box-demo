import test from "node:test";
import assert from "node:assert/strict";
import { STORAGE_KEY, loadFavourites, saveFavourites, starredFirst } from "./favourites.ts";

function fakeStorage(initial?: string) {
  const data = new Map<string, string>();
  if (initial !== undefined) data.set(STORAGE_KEY, initial);
  return {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
  };
}
const valid = new Set(["a", "b", "c"]);

test("starredFirst keeps order within groups", () => {
  const out = starredFirst(["a", "b", "c", "d"], (x) => x === "c" || x === "b");
  assert.deepEqual(out, ["b", "c", "a", "d"]);
  assert.deepEqual(starredFirst([], () => true), []);
  assert.deepEqual(starredFirst(["a", "b"], () => true), ["a", "b"]);
  assert.deepEqual(starredFirst(["a", "b"], () => false), ["a", "b"]);
});

test("starredFirst on a filtered subset and after unstarring", () => {
  const starred = new Set(["c", "b"]);
  assert.deepEqual(starredFirst(["a", "c"], (x) => starred.has(x)), ["c", "a"]);
  starred.delete("c");
  assert.deepEqual(starredFirst(["a", "b", "c"], (x) => starred.has(x)), ["b", "a", "c"]);
});

test("save then load round trips", () => {
  const s = fakeStorage();
  saveFavourites(s, new Set(["b", "a"]));
  assert.deepEqual([...loadFavourites(s, valid)].sort(), ["a", "b"]);
});

test("load returns empty for bad storage", () => {
  assert.equal(loadFavourites(fakeStorage("{bad"), valid).size, 0);
  assert.equal(loadFavourites(fakeStorage('{"a":1}'), valid).size, 0);
  assert.equal(loadFavourites(null, valid).size, 0);
  assert.equal(loadFavourites(fakeStorage(), valid).size, 0);
  const throwing = { getItem: () => { throw new Error("blocked"); } };
  assert.equal(loadFavourites(throwing, valid).size, 0);
});

test("save ignores failures", () => {
  assert.doesNotThrow(() =>
    saveFavourites({ setItem: () => { throw new Error("quota"); } }, new Set(["a"])),
  );
});

test("load drops unknown ids and non-strings", () => {
  const out = loadFavourites(fakeStorage('["a","zzz",3,null,"c"]'), valid);
  assert.deepEqual([...out].sort(), ["a", "c"]);
});
