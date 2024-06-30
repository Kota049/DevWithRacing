export const FavoriteLevel = {
  Favorite: "favorite",
  SecondFavorite: "secondFavorite",
  LongShot: "longShot",
  None: "none",
};
export type FavoriteStatus = (typeof FavoriteLevel)[keyof typeof FavoriteLevel];
export interface FormationState {
  id: string;
  status: FavoriteStatus;
  order: number;
  name: string;
  jockey: string;
}
