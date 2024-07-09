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
                new Id(dd.id),
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
            new Id(dd.id),
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
    const updatedBettingDetails = [];
    for (const bd of b.bettingDetails) {
      const updateDbBettingDetail = await this.prisma.bettingDetail.update({
        where: { id: bd.id.value },
        data: {
          bettingType: bd.bettingType.toString(),
          horse1: bd.horse1,
          horse2: bd.horse2,
          horse3: bd.horse3,
          result: bd.result.toString(),
        },
      });
      const updateBettingDetail = new BettingDetail(
        new Id(updateDbBettingDetail.id),
        updateDbBettingDetail.amount,
        toBettingType(updateDbBettingDetail.bettingType),
        updateDbBettingDetail.horse1,
        updateDbBettingDetail.horse2,
        updateDbBettingDetail.horse3,
        toBettingResult(updateDbBettingDetail.result),
      );
      updatedBettingDetails.push(updateBettingDetail);
    }
    const betting = new Betting(
      b.id,
      b.userId,
      b.raceId,
      updatedBettingDetails.reduce((prev, sum) => prev + sum, 0),
      updatedBettingDetails,
    );
    return Promise.resolve(betting);
  }
}
