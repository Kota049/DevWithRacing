import { Page } from "@playwright/test";

export async function fetchWinAndPlaceOdds(page: Page) {
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

    const minPlaceOdds = minPlaceOddsStr ? parseFloat(minPlaceOddsStr) : NaN;
    const maxPlaceOdds = maxPlaceOddsStr ? parseFloat(maxPlaceOddsStr) : NaN;

    if (isNaN(winOdds) || isNaN(minPlaceOdds) || isNaN(maxPlaceOdds)) {
      continue;
    }
    winOddsList[orderStr] = winOdds;
    placeOddsList[orderStr] = [minPlaceOdds, maxPlaceOdds];
  }
  return { winOddsList, placeOddsList };
}
