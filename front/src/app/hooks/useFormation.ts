import { DragEndEvent } from "@dnd-kit/core";
import { RaceData } from "../types/RaceData";
import {
  FavoriteLevel,
  FavoriteStatus,
  FormationState,
} from "../types/FavoriteStatus";
import { useState } from "react";
import getCombination from "../utils/getCombination";

interface FormationHooks {
  updateFormation({ active, over }: DragEndEvent): void;
  updateBettingList(formation: FormationState[]): void;
  formation: FormationState[];
  bettingList: number[][];
}

const useFormationHooks = (raceData: RaceData[]): FormationHooks => {
  const [formation, setFormation] = useState<FormationState[]>(
    raceData.map((data) => getHorseState(data, FavoriteLevel.None))
  );
  const [combination, setCombination] = useState<number[][]>([]);

  function updateFormation({ active, over }: DragEndEvent) {
    const { status: currentStatus, order } = extractOrderAndStatus(
      active.id.toString()
    );
    const data = raceData.find((el) => el.order == order);
    const target = over?.id;
    if (data == null || target == null) {
      console.log("エラーやで");
    }
    const horceData = data!;
    const targetId = target!.toString();
    const newData = getHorseState(horceData, targetId);
    if (currentStatus == FavoriteLevel.None) {
      const newFormation = [...formation, newData];
      setFormation([
        ...newFormation.filter(
          (element, index, self) =>
            self.findIndex((e) => e.id == element.id) === index
        ),
      ]);
      return;
    }
    setFormation([
      ...formation
        .map((el) => (el.id == active.id ? newData : el))
        .filter(
          (element, index, self) =>
            self.findIndex((e) => e.id == element.id) === index
        ),
    ]);
  }

  function updateBettingList(formation: FormationState[]) {
    const favorites = formation
      .filter((el) => el.status == FavoriteLevel.Favorite)
      .map((el) => el.order)
      .sort((a, b) => a - b);
    const secondFavorites = formation
      .filter((el) => el.status == FavoriteLevel.SecondFavorite)
      .map((el) => el.order)
      .sort((a, b) => a - b);
    const longShots = formation
      .filter((el) => el.status == FavoriteLevel.LongShot)
      .map((el) => el.order)
      .sort((a, b) => a - b);
    setCombination(getCombination(favorites, secondFavorites, longShots));
  }

  return {
    updateFormation,
    updateBettingList,
    formation: formation,
    bettingList: combination,
  };
};

export default useFormationHooks;

const getHorseState = (
  data: RaceData,
  status: FavoriteStatus
): FormationState => {
  const id = `${status}_${data.order}`;
  return { id: id, status: status, ...data };
};

const extractOrderAndStatus = (id: string) => {
  const [status, orderString] = id.split("_");
  const order = parseInt(orderString);
  return { status, order };
};
