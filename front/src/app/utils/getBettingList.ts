import { FormationState, FavoriteLevel } from "../types/FavoriteStatus";
import getCombination from "./getCombination";

function getBettingList(formation: FormationState[]): number[][] {
  const favorites = formation
    .filter((el) => el.status == FavoriteLevel.Favorite)
    .map((el) => el.order)
    .sort((a, b) => a - b);
  const secondFavorites = formation
    .filter((el) => el.status == FavoriteLevel.SecondFavorite)
    .map((el) => el.order)
    .sort((a, b) => a - b);
  const longShots = formation
    .filter((el) => el.status == FavoriteLevel.LongShot)
    .map((el) => el.order)
    .sort((a, b) => a - b);
  return getCombination(favorites, secondFavorites, longShots);
}

export default getBettingList;
