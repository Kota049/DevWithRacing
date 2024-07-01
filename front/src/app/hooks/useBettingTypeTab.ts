import { useState } from "react";

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

interface FormationHooks {
  bettingType: BettingType;
  formationFrameCount: number;
  changeBettingType(newBettingType: BettingType): void;
}

const useFormationHooks = (): FormationHooks => {
  const [bettingType, setBettingType] = useState<BettingType>(Betting.Win);
  const [formationFrameCount, setFormationFrameCount] = useState<number>(1);

  function changeBettingType(nbt: BettingType): void {
    let newCount = 1;
    switch (nbt) {
      case Betting.Exacta || Betting.Quinella || Betting.QuinellaPlace:
        newCount = 2;
        break;
      case Betting.Trifecta || Betting.Trio:
        newCount = 3;
        break;
    }
    setBettingType(nbt);
    setFormationFrameCount(newCount);
  }

  return {
    bettingType: bettingType,
    formationFrameCount: formationFrameCount,
    changeBettingType,
  };
};
