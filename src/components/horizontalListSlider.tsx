import { deduplicateById } from "@/lib/Utils";
import { SeasonsClient, JikanResponse, Anime } from "@tutkli/jikan-ts";
import { Star } from "lucide-react";

const seasonsClient = new SeasonsClient();

export default async function ScrollingAnimeList() {
  let animeList: Anime[] = [];

  await seasonsClient
    .getSeasonNow({
      page: 1,
    })
    .then(async (response: JikanResponse<Anime[]>) => {
      const resp = await response.data;
      animeList.push(...resp);
      return animeList;
    });

  // function deduplicateById<Anime>(
  //   animeList: Anime[],
  //   id: keyof Anime
  // ): Anime[] {
  //   const noDuplicatesList = new Set();
  //   return animeList.filter((anime) => {
  //     const val = anime[id];
  //     if (noDuplicatesList.has(val)) return false;
  //     noDuplicatesList.add(val);
  //     return true;
  //   });
  // }

  const filteredList = deduplicateById(animeList, "mal_id");

  return (
    <>
      <div className="overflow-x-auto scroll-smooth max-w-screen bg-violet-950 py-2 shadow-md">
        <ul className="inline-flex px-7 mt-5 gap-x-7 flex-nowrap">
          {filteredList.map((anime, index) => (
            <li className="w-[15.625rem]" key={index}>
              <div className="flex flex-col">
                <a
                  className="relative inline-block"
                  target="_blank"
                  href={`https://myanimelist.net/anime/${anime["mal_id"]}`}
                >
                  <img
                    src={
                      anime["images"]["webp"]
                        ? anime["images"]["webp"]["large_image_url"]
                        : anime["images"]["jpg"]["image_url"]
                    }
                    className="shadow-xl transition duration-700 ease-in-out rounded-lg min-w-[15.625rem] max-h-[19.5rem] cursor-pointer"
                    alt={`promo image for ${anime["title"]}`}
                  />

                  <span className="absolute text-center inset-0 flex items-center mx-auto justify-center text-fuchsia-200 text-lg font-bold bg-black/65 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    {anime["title_english"]
                      ? anime["title_english"]
                      : anime["title"]}
                  </span>
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
