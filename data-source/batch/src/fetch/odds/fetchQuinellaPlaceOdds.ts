import { Locator, Page } from "@playwright/test";
import makeKey from "../../helper/makeKey";

async function fetchQuinellaPlaceOdds(
  page: Page
): Promise<{ [key: string]: number[] }> {
  const targetLink = page.getByRole("link", { name: "ワイド", exact: true });
  await targetLink.click();
  await page.waitForLoadState();

  const oddsTableFrameList: Locator[] = await page.locator(".wide_list").all();

  const oddsList = await get2HorseOdds(oddsTableFrameList);
  console.log(oddsList);
  return Promise.resolve(oddsList);
}

export default fetchQuinellaPlaceOdds;

async function get2HorseOdds(
  oddsTableFrameList: Locator[]
): Promise<{ [key: string]: number[] }> {
  let oddsList: { [key: string]: number[] } = {};
  for (const oddsTableFrame of oddsTableFrameList) {
    const oddsTableList = await oddsTableFrame.getByRole("table").all();
    for (const oddsTable of oddsTableList) {
      const criteriaOrder = await oddsTable
        .locator("caption")
        .textContent()
        .catch(() => null);
      if (criteriaOrder === null) {
        continue;
      }
      const rows = await oddsTable.getByRole("row").all();
      for (const row of rows) {
        const order = await row
          .getByRole("rowheader")
          .textContent()
          .catch(() => null);
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
        if (isNaN(minPlaceOdds) || isNaN(maxPlaceOdds)) {
          continue;
        }
        const key = makeKey(criteriaOrder, order);
        oddsList[key] = [minPlaceOdds, maxPlaceOdds];
      }
    }
  }
  return Promise.resolve(oddsList);
}
