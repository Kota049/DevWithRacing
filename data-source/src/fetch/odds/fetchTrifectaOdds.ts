import { Page } from "@playwright/test";

// 実行できていないので注意
async function fetchTrifectaOdds(
  page: Page
): Promise<{ [key: string]: number }> {
  const targetLink = page.getByRole("link", { name: "3連単", exact: true });
  await targetLink.click();
  await page.waitForLoadState();
  let oddsList: { [key: string]: number } = {};

  await page.getByRole("link", { name: "人気順" }).click();
  await page.waitForLoadState();

  const oddsTableFrameList = await page.locator(".tan3_list").all();

  for (const oddsTableFrame of oddsTableFrameList) {
    const oddsTableList = await oddsTableFrame.getByRole("table").all();
    for (const oddsTable of oddsTableList) {
      const tableBody = oddsTable.locator("tbody");
      const rows = await tableBody.getByRole("row").all();
      for (const row of rows) {
        const order = await row
          .locator(".num")
          .textContent()
          .catch(() => null);
        if (order === null) {
          continue;
        }
        const odds = await row
          .locator(".odds")
          .textContent()
          .catch(() => null);
        const oddsFloat = odds ? parseFloat(odds) : NaN;

        if (isNaN(oddsFloat)) {
          continue;
        }
        oddsList[order] = oddsFloat;
      }
    }
  }
  console.log(oddsList);
  return Promise.resolve(oddsList);
}

export default fetchTrifectaOdds;
