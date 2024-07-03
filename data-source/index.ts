// entory point

import fetchCurrentLinkCount from "./src/fetch/fetchCurrentLink";
import fetchRaceOdds from "./src/fetch/fetchStadiumDateOdds";

(async () => {
  try {
    const linkCount = await fetchCurrentLinkCount();
    for (let i = 0; i < linkCount; i++) {
      const res = await fetchRaceOdds(i);
      console.log(res);
    }
  } catch (error) {
    console.log(error);
  }
})();
