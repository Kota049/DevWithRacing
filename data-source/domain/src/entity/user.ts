export class User {
  public userId: Id;
  public leverage: number;
  constructor(userId: Id, leverage: number) {
    (this.userId = userId), (this.leverage = leverage);
  }
}

export class Id {
  value: number;
  constructor(v: number) {
    this.value = v;
  }
}
