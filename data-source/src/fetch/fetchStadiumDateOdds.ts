import RACES from "../const/Races";
import toJraPage from "../to/toJraPage";
import { RaceOdds } from "../types/RaceOdds";
import fetchExactaOdds from "./odds/fetchExactaOdds";
import fetchQuinellaOdds from "./odds/fetchQuinellaOdds";
import fetchQuinellaPlaceOdds from "./odds/fetchQuinellaPlaceOdds";
import fetchTrifectaOdds from "./odds/fetchTrifectaOdds";
import fetchTrioOdds from "./odds/fetchTrioOdds";
import { fetchWinAndPlaceOdds } from "./odds/fetchWinAndPlaceOdds";

async function fetchRaceOdds(linkIndex: number): Promise<RaceOdds[]> {
  let res: RaceOdds[] = [];

  for (const race of RACES) {
    const { browser, page } = await toJraPage();
    try {
      // move page
      const target = page.locator(".thisweek");
      const links = await target.getByRole("link").all();
      await links[linkIndex].click();
      await page.waitForLoadState();

      // move & get win & place
      const winPlaceLink = page.getByRole("link", { name: race, exact: true });
      await winPlaceLink.click();
      await page.waitForLoadState();

      const { winOddsList, placeOddsList } = await fetchWinAndPlaceOdds(page);

      const quinellaOdds = await fetchQuinellaOdds(page);
      const quinellaPlaceOdds = await fetchQuinellaPlaceOdds(page);
      const exactaOdds = await fetchExactaOdds(page);
      const trioOdds = await fetchTrioOdds(page);
      const trifectaOdds = await fetchTrifectaOdds(page);
      const currentRaceOdds: RaceOdds = {
        win: winOddsList,
        place: placeOddsList,
        quinella_place: quinellaPlaceOdds,
        quinella: quinellaOdds,
        exacta: exactaOdds,
        trifecta: trifectaOdds,
        trio: trioOdds,
      };
      console.log(JSON.stringify(currentRaceOdds, null, "\t"));
      res.push(currentRaceOdds);
    } catch (error) {
      await page.screenshot({ path: "screenshot/error.png" });
      return Promise.reject(`error in fetchRaceOdds | ${error}`);
    } finally {
      await page.close();
      await browser.close();
    }
  }
  return Promise.resolve(res);
}

export default fetchRaceOdds;
