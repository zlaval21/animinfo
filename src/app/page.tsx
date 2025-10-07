import ScrollingAnimeList from "@/components/horizontalListSlider";
import TopMangaList from "@/lib/MangaUtils";
import animeList from "../lib/GetSeasonName";
import { Anime } from "@tutkli/jikan-ts";

const formatSeasonName = async (list: Anime[]) => {
  const firstAnime = await list.length > 0 ? list[0] : "";
  let seasonNameAndYear = "";

  if (!firstAnime) {
    return;
  }

  return (seasonNameAndYear = firstAnime["season"] + " " + firstAnime["year"]);
};

export default function Home() {
  return (
    <div>
      <div className="text-violet-950 items-center justify-items-center text-xl font-[family-name:var(--font-onest)]">
        <div className="items-center justify-items-center">
          <p className="mt-12 pt-6 pb-10 text-3xl mx-auto text-center font-bold">
            Welcome to the <br /> internet's newest corner for <br />  all things anime!
          </p>

          <div className="font-bold pb-4 text-2xl">
            Current Season:{" "}
            <span className="capitalize ">{formatSeasonName(animeList)}</span>
          </div>
          <ScrollingAnimeList />
          <TopMangaList />
        </div>

        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"></main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
      </div>
    </div>
  );
}
