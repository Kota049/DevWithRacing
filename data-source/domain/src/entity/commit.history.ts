import { Id } from './user';

export class CommitHistory {
  constructor(
    public userId: Id,
    public diff: number,
    public createdAt: Date,
  ) {}
}
