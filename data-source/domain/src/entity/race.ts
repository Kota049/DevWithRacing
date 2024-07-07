import { Id } from './user';

export class Race {
  constructor(
    public id: Id,
    public startAt: Date,
    public name: string,
    public horses: Horse[],
  ) {}

  canBattingDuration(now: Date): boolean {
    const deadline = 2 * 60 * 1000;
    const diff = this.startAt.getTime() - now.getTime();
    return diff > deadline;
  }
}

export class Horse {
  constructor(
    public order: number,
    public name: string,
    public jockey: string,
  ) {}
}
