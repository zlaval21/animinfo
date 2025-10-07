import { MangaClient, TopClient, JikanResponse, Manga } from "@tutkli/jikan-ts";
import { deduplicateById } from "./Utils";

const mangaClient = new MangaClient();
const topClient = new TopClient();

export default async function TopMangaList() {
  let mangaList: Manga[] = [];

  await topClient
    .getTopManga({
    //   filter: "bypopularity",
      limit: 10,
    })
    .then(async (response: JikanResponse<Manga[]>) => {
      const resp = await response.data;
      mangaList.push(...resp);
      return mangaList;
    });

  const filteredList = deduplicateById(mangaList, "mal_id");

  console.log(filteredList);

  return (
    <></>
  )
}
