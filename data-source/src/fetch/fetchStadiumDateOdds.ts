import RACES from "../const/Races";
import toJraPage from "../to/toJraPage";
import { RaceOdds } from "../types/RaceOdds";

async function fetchRaceOdds(linkIndex: number): Promise<RaceOdds[]> {
  let res: RaceOdds[] = [];

  for (const race of RACES) {
    console.log(`${race}fetchスタート`);
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
      const table = await page.getByRole("table").all();
      const tableBody = table[0].locator("tbody");
      const tableRows = await tableBody.getByRole("row").all();

      let winOddsList: { [key: string]: number } = {};
      let placeOddsList: { [key: string]: number[] } = {};

      for (const row of tableRows) {
        const orderStr = await row.locator(".num").textContent();
        if (orderStr === null) {
          continue;
        }
        const winOddsStr = await row.locator(".odds_tan").textContent();
        const winOdds = winOddsStr ? parseFloat(winOddsStr) : NaN;

        const minPlaceOddsStr = await row
          .locator(".min")
          .textContent()
          .catch(() => null);
        const maxPlaceOddsStr = await row
          .locator(".max")
          .textContent()
          .catch(() => null);

        const minPlaceOdds = minPlaceOddsStr
          ? parseFloat(minPlaceOddsStr)
          : NaN;
        const maxPlaceOdds = maxPlaceOddsStr
          ? parseFloat(maxPlaceOddsStr)
          : NaN;

        if (isNaN(winOdds) || isNaN(minPlaceOdds) || isNaN(maxPlaceOdds)) {
          continue;
        }
        winOddsList[orderStr] = winOdds;
        placeOddsList[orderStr] = [minPlaceOdds, maxPlaceOdds];
      }

      const currentRaceOdds: RaceOdds = {
        win: winOddsList,
        place: placeOddsList,
        quinella_place: {},
        quinella: {},
        exacta: {},
        trifecta: {},
        trio: {},
      };
      console.log(JSON.stringify(currentRaceOdds, null, "\t"));
      res.push(currentRaceOdds);
    } catch (error) {
      await page.screenshot({ path: "error.png" });
      return Promise.reject(`error in fetchRaceOdds | ${error}`);
    } finally {
      await page.close();
      await browser.close();
    }
  }
  return Promise.resolve(res);
}

export default fetchRaceOdds;
