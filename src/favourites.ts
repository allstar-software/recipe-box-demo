export const STORAGE_KEY = "recipe-box:favourites";

type ReadableStorage = { getItem(key: string): string | null };
type WritableStorage = { setItem(key: string, value: string): void };

export function loadFavourites(
  storage: ReadableStorage | null,
  validIds: Set<string>,
): Set<string> {
  try {
    if (!storage) return new Set();
    const raw = storage.getItem(STORAGE_KEY);
    if (raw === null) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((x): x is string => typeof x === "string" && validIds.has(x)));
  } catch {
    return new Set();
  }
}

export function saveFavourites(storage: WritableStorage | null, ids: Set<string>): void {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // storage full or disabled: favourites just won't persist
  }
}

export function starredFirst<T>(items: T[], isStarred: (item: T) => boolean): T[] {
  return [...items.filter(isStarred), ...items.filter((i) => !isStarred(i))];
}

export function getStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
