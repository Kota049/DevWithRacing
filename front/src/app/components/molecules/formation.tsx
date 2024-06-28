"use client";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import HorseCard from "../atomic/HorseCard";
import DroppableFrame from "../atomic/DroppableFrame";

const Formation = () => {
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <HorseCard order={0} name={"アルナシーム"} jockey={"鮫島克"} id={"1"} />
      <HorseCard order={0} name={"アルナシーム"} jockey={"鮫島克"} id={"2"} />
      <HorseCard order={0} name={"アルナシーム"} jockey={"鮫島克"} id={"3"} />
      <HorseCard order={0} name={"アルナシーム"} jockey={"鮫島克"} id={"4"} />
      <HorseCard order={0} name={"アルナシーム"} jockey={"鮫島克"} id={"5"} />
      <DroppableFrame id="A"></DroppableFrame>
      <DroppableFrame id="B"></DroppableFrame>
      <DroppableFrame id="C"></DroppableFrame>
    </DndContext>
  );

  function handleDragEnd({ active }: DragEndEvent) {
    console.log("dropped");
    console.log(`${active.id}`);
  }
};

export default Formation;
