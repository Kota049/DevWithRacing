// entory point

import toJraPage from "./src/to/toJraPage";

(async () => {
  const { page, browser } = await toJraPage();
  try {
    await page.screenshot({ path: "hogeho.png" });
    console.log("完了");
  } catch (error) {
    console.log(error);
  } finally {
    await page.close();
    await browser.close();
    console.log("close完了");
  }
})();
