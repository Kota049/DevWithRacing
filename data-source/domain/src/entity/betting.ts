import { Id } from './user';

export class Betting {
  constructor(
    public userId: Id,
    public raceId: Id,
    public totalAmount: number,
    public bettingDetails: BettingDetail[],
  ) {}
}

export class BettingDetail {
  constructor(
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

export enum BettingResult {
  BETTING,
  WIN,
  LOSE,
  RESTITUTION,
}
