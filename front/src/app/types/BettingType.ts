export const Betting = {
  Win: "Win",
  Place: "Place",
  Exacta: "Exacta",
  Quinella: "Quinella",
  Trifecta: "Trifecta",
  Trio: "Trio",
  QuinellaPlace: "QuinellaPlace",
};
export const BettingTypeList = [
  Betting.Win,
  Betting.Place,
  Betting.QuinellaPlace,
  Betting.Quinella,
  Betting.Exacta,
  Betting.Trio,
  Betting.Trifecta,
];
export function parseJapanese(bt: BettingType): string {
  switch (bt) {
    case Betting.Win:
      return "単勝";
    case Betting.Place:
      return "複勝";
    case Betting.QuinellaPlace:
      return "ワイド";
    case Betting.Quinella:
      return "馬連";
    case Betting.Exacta:
      return "馬単";
    case Betting.Trio:
      return "3連複";
    default:
      return "3連単";
  }
}
export type BettingType = (typeof Betting)[keyof typeof Betting];
