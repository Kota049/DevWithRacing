"use client";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import HorseCard from "../atomic/HorseCard";
import DroppableFrame from "../atomic/DroppableFrame";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import getCombination from "@/app/utils/getCombination";
import { red } from "@mui/material/colors";
import BettingCombination from "../atomic/BettingCombination";
// fetch data
interface RaceData {
  order: number;
  name: string;
  jockey: string;
}

const FavoriteLevel = {
  Favorite: "favorite",
  SecondFavorite: "secondFavorite",
  LongShot: "longShot",
  None: "none",
};

type FavoriteStatus = (typeof FavoriteLevel)[keyof typeof FavoriteLevel];

interface FormationState {
  id: string;
  status: FavoriteStatus;
  order: number;
  name: string;
  jockey: string;
}

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

const Formation = () => {
  const horcesData: RaceData[] = [
    { order: 1, name: "ジャスティンパレス", jockey: "鮫島克" },
    { order: 2, name: "ダノンベルーガ", jockey: "川田" },
    { order: 3, name: "イクイノックス", jockey: "Cルメール" },
    { order: 4, name: "プラダリア", jockey: "池添" },
    { order: 5, name: "アスクビクターモア", jockey: "田辺" },
    { order: 6, name: "ドウデュース", jockey: "武豊" },
    { order: 7, name: "ジオグリフ", jockey: "福永" },
    { order: 8, name: "アケルナルスター", jockey: "丹内" },
    { order: 9, name: "スタニングローズ", jockey: "坂井" },
    { order: 10, name: "ナミュール", jockey: "藤岡康" },
    { order: 11, name: "サンストックトン", jockey: "松岡" },
    { order: 12, name: "レッドモンレーヴ", jockey: "松山" },
    { order: 13, name: "デシエルト", jockey: "岩田康" },
    { order: 14, name: "アルナシーム", jockey: "鮫島克" },
    { order: 15, name: "マテンロウレオ", jockey: "横山典" },
    { order: 16, name: "ガイアフォース", jockey: "西村淳" },
    { order: 17, name: "セイウンハーデス", jockey: "幸" },
    { order: 18, name: "ブローザホーン", jockey: "菅原" },
  ];

  const [formation, setFormation] = useState<FormationState[]>(
    horcesData.map((data) => getHorseState(data, FavoriteLevel.None))
  );
  const [combination, setCombination] = useState<number[][]>();
  useEffect(() => {
    updateCombination(formation);
  }, [formation]);
  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <Box sx={{ display: "flex", width: "100%", flexGrow: 1 }}>
          <DroppableFrame id={FavoriteLevel.None}>
            {formation
              .filter((el) => el.status == FavoriteLevel.None)
              .map((el) => {
                return (
                  <HorseCard
                    order={el.order}
                    name={el.name}
                    jockey={el.jockey}
                    id={el.id}
                    key={el.id}
                  />
                );
              })}
          </DroppableFrame>
          <DroppableFrame id={FavoriteLevel.Favorite}>
            {formation
              .filter((el) => el.status == FavoriteLevel.Favorite)
              .map((el) => {
                return (
                  <HorseCard
                    order={el.order}
                    name={el.name}
                    jockey={el.jockey}
                    id={el.id}
                    key={el.id}
                  />
                );
              })}
          </DroppableFrame>
          <DroppableFrame id={FavoriteLevel.SecondFavorite}>
            {formation
              .filter((el) => el.status == FavoriteLevel.SecondFavorite)
              .map((el) => {
                return (
                  <HorseCard
                    order={el.order}
                    name={el.name}
                    jockey={el.jockey}
                    id={el.id}
                    key={el.id}
                  />
                );
              })}
          </DroppableFrame>
          <DroppableFrame id={FavoriteLevel.LongShot}>
            {formation
              .filter((el) => el.status == FavoriteLevel.LongShot)
              .map((el) => {
                return (
                  <HorseCard
                    order={el.order}
                    name={el.name}
                    jockey={el.jockey}
                    id={el.id}
                    key={el.id}
                  />
                );
              })}
          </DroppableFrame>
        </Box>
      </DndContext>
      <Box width={"100%"} sx={{ backgroundColor: red[50] }}>
        <Typography>買い目</Typography>
        {combination?.map((el) => (
          <BettingCombination
            first={el[0]}
            second={el[1]}
            third={el[2]}
            key={el.toString()}
          />
        ))}
      </Box>
    </>
  );

  function handleDragEnd({ active, over }: DragEndEvent) {
    const { status: currentStatus, order } = extractOrderAndStatus(
      active.id.toString()
    );
    const data = horcesData.find((el) => el.order == order);
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

  function updateCombination(formation: FormationState[]) {
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
};

export default Formation;
