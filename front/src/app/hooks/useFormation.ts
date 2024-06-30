import { DragEndEvent } from "@dnd-kit/core";
import { RaceData } from "../types/RaceData";
import {
  FavoriteLevel,
  FavoriteStatus,
  FormationState,
} from "../types/FavoriteStatus";
import { useState } from "react";
import { useSetAtom } from "jotai";
import errorAtom from "../globalState/error";

interface FormationHooks {
  updateFormation({ active, over }: DragEndEvent): void;
  formation: FormationState[];
}

const useFormationHooks = (raceData: RaceData[]): FormationHooks => {
  const [formation, setFormation] = useState<FormationState[]>(
    raceData.map((data) => getHorseState(data, FavoriteLevel.None))
  );
  const setError = useSetAtom(errorAtom);

  function updateFormation({ active, over }: DragEndEvent) {
    const { status: currentStatus, order } = extractOrderAndStatus(
      active.id.toString()
    );
    const data = raceData.find((el) => el.order == order);
    const target = over?.id;
    if (data == null || target == null) {
      setError(["枠内にセットしてください"]);
      return;
    }
    const horceData = data!;
    const targetId = target!.toString();
    const newData = getHorseState(horceData, targetId);
    if (currentStatus == FavoriteLevel.None) {
      const newFormation = [...formation, newData];
      setFormation(() => [
        ...newFormation.filter(
          (element, index, self) =>
            self.findIndex((e) => e.id == element.id) === index
        ),
      ]);
      return;
    }
    setFormation(() => [
      ...formation
        .map((el) => (el.id == active.id ? newData : el))
        .filter(
          (element, index, self) =>
            self.findIndex((e) => e.id == element.id) === index
        ),
    ]);
  }

  return {
    updateFormation,
    formation: formation,
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
