import { Browser, Page } from "@playwright/test";
import toJraPage from "../to/toJraPage";

async function fetchCurrentLinkCount(): Promise<number> {
  const { page, browser } = await toJraPage();
  try {
    const target = page.locator(".thisweek");
    const links = await target.getByRole("link").all();
    return links.length;
  } catch (error) {
    throw new Error(`error in fetchCurrentLink | ${error}`);
  } finally {
    await page.close();
    await browser.close();
  }
}

export default fetchCurrentLinkCount;
