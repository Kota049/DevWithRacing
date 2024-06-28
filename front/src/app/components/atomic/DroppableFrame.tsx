"use client";
import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";

interface DroppableFrameArg {
  id: string;
}

const DroppableFrame = ({ id }: DroppableFrameArg) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{ display: "flex", minHeight: "100px", minWidth: "100px" }}
    ></Box>
  );
};

export default DroppableFrame;
