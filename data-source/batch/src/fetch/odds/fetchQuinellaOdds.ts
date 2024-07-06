import { Page } from "@playwright/test";
import makeKey from "../../helper/makeKey";

async function fetchQuinellaOdds(
  page: Page
): Promise<{ [key: string]: number }> {
  const targetLink = page.getByRole("link", { name: "馬連", exact: true });
  await targetLink.click();
  await page.waitForLoadState();

  let oddsList: { [key: string]: number } = {};
  const oddsTableFrameList = await page.locator(".umaren_list").all();

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
        const odds = await row
          .getByRole("cell")
          .textContent()
          .catch(() => null);
        const oddsFloat = odds ? parseFloat(odds) : NaN;

        if (isNaN(oddsFloat)) {
          continue;
        }
        const key = makeKey(criteriaOrder, order);
        oddsList[key] = oddsFloat;
      }
    }
  }
  console.log(oddsList);
  return Promise.resolve(oddsList);
}

export default fetchQuinellaOdds;
