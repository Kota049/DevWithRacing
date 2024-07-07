import { Id } from './user';

export class Budget {
  constructor(
    public budget: number,
    public userId: Id,
  ) {}
}
