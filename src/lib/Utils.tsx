import { Manga, Anime } from "@tutkli/jikan-ts";

export function deduplicateById(list: any[], id: any): Anime[] | Manga[] {
  const noDuplicatesList = new Set();
  return list.filter((series) => {
    const val = series[id];
    if (noDuplicatesList.has(val)) return false;
    noDuplicatesList.add(val);
    return true;
  });
}
