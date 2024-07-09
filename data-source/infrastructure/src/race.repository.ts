import { Id } from '@domain/entity/user';
import {
  CreateRace,
  RaceRepositoryInterface,
} from '@domain/repository/race.repository';
import { Horse, Race } from '@domain/entity/race';
import { PrismaService } from './prisma.service';
import { addDays } from 'date-fns';

export class RaceRepository implements RaceRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}
  async create(t: CreateRace): Promise<Race> {
    const race = await this.prisma.race.create({
      data: {
        startAt: t.startAt,
        raceName: t.name,
        horses: {
          create: t.horses.map((h) => {
            return {
              order: h.order,
              name: h.name,
              jockeyName: h.jockey,
            };
          }),
        },
      },
      include: {
        horses: true,
      },
    });
    return Promise.resolve(this.mapper(race));
  }
  async update(t: Race): Promise<Race> {
    const updateRace = await this.prisma.race.update({
      where: {
        id: t.id.value,
      },
      data: {
        startAt: t.startAt,
        raceName: t.name,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, __, updateHorses] = await this.prisma.$transaction([
      this.prisma.horse.deleteMany({ where: { raceId: updateRace.id } }),
      this.prisma.horse.createMany({
        data: t.horses.map((h) => {
          return {
            raceId: updateRace.id,
            name: h.name,
            order: h.order,
            jockeyName: h.jockey,
          };
        }),
      }),
      this.prisma.horse.findMany({
        where: {
          raceId: updateRace.id,
        },
      }),
    ]);

    const res = new Race(
      new Id(updateRace.id),
      updateRace.startAt,
      updateRace.raceName,
      updateHorses.map((h) => {
        return new Horse(h.order, h.name, h.jockeyName);
      }),
    );
    return Promise.resolve(res);
  }
  async findOne(rId: Id): Promise<Race> {
    const r = await this.prisma.race.findUnique({
      where: { id: rId.value },
      include: {
        horses: { orderBy: { order: 'asc' } },
      },
    });
    const race = this.mapper(r);
    return Promise.resolve(race);
  }
  async findThisWeekRaces(): Promise<Race[]> {
    const now = new Date();
    const daysUntilNextMonday = (8 - now.getDay()) % 7 || 7;
    const nextMonday = addDays(now, daysUntilNextMonday);
    const races = await this.prisma.race.findMany({
      where: {
        startAt: {
          gte: now,
          lt: nextMonday,
        },
      },
      include: { horses: true },
    });
    return Promise.resolve(races.map((r) => this.mapper(r)));
  }
  private mapper(
    r: {
      horses: {
        id: number;
        raceId: number;
        name: string;
        jockeyName: string;
        order: number;
      }[];
    } & { id: number; raceName: string; startAt: Date },
  ) {
    return new Race(
      new Id(r.id),
      r.startAt,
      r.raceName,
      r.horses.map((h) => {
        return new Horse(h.order, h.name, h.jockeyName);
      }),
    );
  }
}
