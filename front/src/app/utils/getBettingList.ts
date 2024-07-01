import { Betting, BettingType } from "../types/BettingType";
import { FormationState, FavoriteLevel } from "../types/FavoriteStatus";
import getCombination from "./getCombination";
import getPermutation from "./getPermutation";

function getBettingList(
  formation: FormationState[],
  bettingType: BettingType
): number[][] {
  const favorites = formation
    .filter((el) => el.status == FavoriteLevel.Favorite)
    .map((el) => el.order)
    .sort((a, b) => a - b);
  if (bettingType == Betting.Win) {
    return getPermutation(favorites);
  }
  if (bettingType == Betting.Place) {
    return getCombination(favorites);
  }
  const secondFavorites = formation
    .filter((el) => el.status == FavoriteLevel.SecondFavorite)
    .map((el) => el.order)
    .sort((a, b) => a - b);
  if (bettingType == Betting.Exacta) {
    return getPermutation(favorites, secondFavorites);
  }
  if (bettingType == Betting.Quinella || bettingType == Betting.QuinellaPlace) {
    return getCombination(favorites, secondFavorites);
  }

  const longShots = formation
    .filter((el) => el.status == FavoriteLevel.LongShot)
    .map((el) => el.order)
    .sort((a, b) => a - b);
  if (bettingType == Betting.Trio) {
    return getCombination(favorites, secondFavorites, longShots);
  }
  return getPermutation(favorites, secondFavorites, longShots);
}

export default getBettingList;
