import { Id } from './user';

export class Betting {
  constructor(
    public id: Id,
    public userId: Id,
    public raceId: Id,
    public totalAmount: number,
    public bettingDetails: BettingDetail[],
  ) {}
}

export class BettingDetail {
  constructor(
    public id: Id,
    public amount: number,
    public bettingType: BettingType,
    public horse1: number,
    public horse2: number,
    public horse3: number,
    public result: BettingResult,
  ) {}
}

export enum BettingType {
  Win,
  Place,
  Exacta,
  Quinella,
  Trifecta,
  Trio,
  QuinellaPlace,
}

export function toBettingType(s: string): BettingType {
  if (s === 'Win') {
    return BettingType.Win;
  }
  if (s === 'Place') {
    return BettingType.Place;
  }
  if (s === 'Exacta') {
    return BettingType.Exacta;
  }
  if (s === 'Quinella') {
    return BettingType.Quinella;
  }
  if (s === 'Trifecta') {
    return BettingType.Trifecta;
  }
  if (s === 'Trio') {
    return BettingType.Trio;
  }
  if (s === 'QuinellaPlace') {
    return BettingType.QuinellaPlace;
  }
  throw new Error('incalid betting type');
}

export enum BettingResult {
  BETTING,
  WIN,
  LOSE,
  RESTITUTION,
}

export function toBettingResult(s: string): BettingResult {
  if (s === 'BETTING') {
    return BettingResult.BETTING;
  }
  if (s === 'WIN') {
    return BettingResult.WIN;
  }
  if (s === 'LOSE') {
    return BettingResult.LOSE;
  }
  if (s === 'RESTITUTION') {
    return BettingResult.RESTITUTION;
  }
  throw new Error('incalid betting result');
}
