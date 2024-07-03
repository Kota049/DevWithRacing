export interface RaceOdds {
  win: { [key: string]: number };
  place: { [key: string]: number[] };
  quinella_place: { [key: string]: number[] };
  quinella: { [key: string]: number };
  exacta: { [key: string]: number };
  trifecta: { [key: string]: number };
  trio: { [key: string]: number };
}
