import { useState } from "react";
import { BettingType, Betting } from "../types/BettingType";

interface BettingTypeHooks {
  bettingType: BettingType;
  formationFrameCount: number;
  changeBettingType(event: React.SyntheticEvent, value: BettingType): void;
}

const useBettingTypeHooks = (): BettingTypeHooks => {
  const [bettingType, setBettingType] = useState<BettingType>(Betting.Win);
  const [formationFrameCount, setFormationFrameCount] = useState<number>(1);

  function changeBettingType(
    _event: React.SyntheticEvent,
    value: BettingType
  ): void {
    let newCount = 1;
    if (
      [Betting.Exacta, Betting.Quinella, Betting.QuinellaPlace].includes(value)
    ) {
      newCount = 2;
    }
    if ([Betting.Trifecta, Betting.Trio].includes(value)) {
      newCount = 3;
    }
    setBettingType((_prev) => value);
    setFormationFrameCount((_prev) => newCount);
  }

  return {
    bettingType: bettingType,
    formationFrameCount: formationFrameCount,
    changeBettingType,
  };
};

export default useBettingTypeHooks;
