// entory point

import fetchCurrentLinkCount from "../src/fetch/fetchCurrentLink";
import fetchRaceOdds from "../src/fetch/fetchStadiumDateOdds";

(async () => {
  try {
    const linkCount = await fetchCurrentLinkCount();
    const todayStart = linkCount / 2;
    for (let i = todayStart; i < linkCount; i++) {
      const res = await fetchRaceOdds(i);
      console.log(res);
    }
  } catch (error) {
    console.log(error);
  }
})();
