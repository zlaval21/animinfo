import { SeasonsClient, JikanResponse, Anime } from "@tutkli/jikan-ts";
import { Star } from "lucide-react";

const seasonsClient = new SeasonsClient();

export default async function ScrollingAnimeList() {
  let animeList: Anime[] = [];

  // for (let malId = 1; rankingId <= 10; malId++) {
  //   const fetchedAnime = await fetch(`https://api.jikan.moe/v4/anime/${malId}`);

  //   if (fetchedAnime.status < 400) {
  //     const animeJSON = await fetchedAnime.json();
  //     const parsedAnime = animeJSON.data;
  //     animeList.push({ rankingId, parsedAnime });
  //     rankingId++;
  //   }
  // }

  await seasonsClient
    .getSeasonNow({
      page: 1,
    })
    .then(async (response: JikanResponse<Anime[]>) => {
      const resp = await response.data;
      animeList.push(...resp);
      return animeList;
      // if (await response.pagination?.has_next_page) {
      //   page += 1;
      //   allAnimeData.push(...response.data);
      //   fetchedSeasonalData(page, allAnimeData);
      // } else {
      //   return allAnimeData;
      // }
    });

  function deduplicateById<Anime>(
    animeList: Anime[],
    id: keyof Anime
  ): Anime[] {
    const noDuplicatesList = new Set();
    return animeList.filter((anime) => {
      const val = anime[id];
      if (noDuplicatesList.has(val)) return false;
      noDuplicatesList.add(val);
      return true;
    });
  }

  const filteredList = deduplicateById(animeList, "mal_id");

  return (
    <>
      <div className="overflow-x-auto scroll-smooth max-w-screen bg-violet-950 shadow-md">
        <ul className="inline-flex px-7 mt-5 gap-x-7 flex-nowrap">
          {filteredList.map((anime, index) => (
            <li className="w-[15.625rem]" key={index}>
              <div className="flex flex-col">
                <a
                  target="_blank"
                  href={`https://myanimelist.net/anime/${anime["mal_id"]}`}
                >
                  <img
                    src={
                      anime["images"]["webp"]
                        ? anime["images"]["webp"]["large_image_url"]
                        : anime["images"]["jpg"]["image_url"]
                    }
                    className="shadow-xl rounded-lg min-w-[15.625rem] max-h-[19.5rem] cursor-pointer"
                    alt={`promo image for ${anime["title"]}`}
                  ></img>
                </a>

                <div className="flex items-center mx-auto shadow-xl">
                  <Star className="my-2.5 fill-fuchsia-200" size={32} />
                  <span className="text-fuchsia-200 font-semibold">
                    {anime["score"] ? anime["score"] : "Yet to Air"}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
