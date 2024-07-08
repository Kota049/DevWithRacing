import {
  Betting,
  BettingDetail,
  toBettingResult,
  toBettingType,
} from '@domain/entity/betting';
import { BettingRepositoryInterface } from '@domain/repository/betting.repository';
import { Id } from '@domain/entity/user';
import { PrismaService } from './prisma.service';

export class BettingRepository implements BettingRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}
  async findUserALl(userId: Id): Promise<Betting[]> {
    const dbBettings = await this.prisma.betting.findMany({
      where: { userId: userId.value },
      include: { bettingDetails: true },
    });
    const bettings = dbBettings.map(
      (d) =>
        new Betting(
          new Id(d.id),
          new Id(d.userId),
          new Id(d.raceId),
          d.bettingDetails
            .map((d) => d.amount)
            .reduce((prev, sum) => prev + sum, 0),
          d.bettingDetails.map(
            (dd) =>
              new BettingDetail(
                dd.amount,
                toBettingType(dd.bettingType),
                dd.horse1,
                dd.horse2,
                dd.horse3,
                toBettingResult(dd.result),
              ),
          ),
        ),
    );
    return Promise.resolve(bettings);
  }
  async create(b: Betting): Promise<Betting> {
    const dbBetting = await this.prisma.betting.create({
      data: {
        userId: b.userId.value,
        raceId: b.raceId.value,
        bettingDetails: {
          create: b.bettingDetails.map((el) => {
            return {
              bettingType: el.bettingType.toString(),
              horse1: el.horse1,
              horse2: el.horse2,
              horse3: el.horse3,
              amount: el.amount,
              result: el.result.toString(),
            };
          }),
        },
      },
      include: { bettingDetails: true },
    });
    const betting = new Betting(
      new Id(dbBetting.id),
      new Id(dbBetting.userId),
      new Id(dbBetting.raceId),
      dbBetting.bettingDetails
        .map((d) => d.amount)
        .reduce((prev, sum) => prev + sum, 0),
      dbBetting.bettingDetails.map(
        (dd) =>
          new BettingDetail(
            dd.amount,
            toBettingType(dd.bettingType),
            dd.horse1,
            dd.horse2,
            dd.horse3,
            toBettingResult(dd.result),
          ),
      ),
    );
    return Promise.resolve(betting);
  }
  async update(b: Betting): Promise<Betting> {
    // 個々にbettingDetailをアップデートしないといけないよ
    // コンパイルエラーが出ないだけで、ロジック違うよ
    const dbBetting = await this.prisma.betting.update({
      where: {
        id: b.id.value,
      },
      data: {
        userId: b.userId.value,
        raceId: b.raceId.value,
        bettingDetails: {
          create: b.bettingDetails.map((el) => {
            return {
              bettingType: el.bettingType.toString(),
              horse1: el.horse1,
              horse2: el.horse2,
              horse3: el.horse3,
              amount: el.amount,
              result: el.result.toString(),
            };
          }),
        },
      },
      include: { bettingDetails: true },
    });
    const betting = new Betting(
      new Id(dbBetting.id),
      new Id(dbBetting.userId),
      new Id(dbBetting.raceId),
      dbBetting.bettingDetails
        .map((d) => d.amount)
        .reduce((prev, sum) => prev + sum, 0),
      dbBetting.bettingDetails.map(
        (dd) =>
          new BettingDetail(
            dd.amount,
            toBettingType(dd.bettingType),
            dd.horse1,
            dd.horse2,
            dd.horse3,
            toBettingResult(dd.result),
          ),
      ),
    );
    return Promise.resolve(betting);
  }
}
