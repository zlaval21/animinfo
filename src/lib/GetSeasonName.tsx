import { SeasonsClient, JikanResponse, Anime } from "@tutkli/jikan-ts";

const seasonsClient = new SeasonsClient();
let animeList: Anime[] = [];

seasonsClient
  .getSeasonNow({
    page: 1,
  })
  .then(async (response: JikanResponse<Anime[]>) => {
    const resp = response.data;
    animeList.push(...resp);
  });

console.log("Anime List: " + animeList);
export default animeList;
