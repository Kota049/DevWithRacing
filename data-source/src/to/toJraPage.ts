import { Browser, Page, chromium } from "@playwright/test";

async function toJraPage(): Promise<{ browser: Browser; page: Page }> {
  const browser = await chromium.launch({ headless: true, slowMo: 500 });
  const page = await browser.newPage({ ignoreHTTPSErrors: true });
  await page.goto("https://www.jra.go.jp/keiba/");
  const oddsPageLink = page.getByRole("link", { name: "オッズ", exact: true });
  await oddsPageLink.click();
  await page.waitForLoadState();
  return { browser, page };
}

export default toJraPage;
