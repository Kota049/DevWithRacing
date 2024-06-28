"use client";
import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import { ReactNode } from "react";

interface DroppableFrameArg {
  id: string;
  children: ReactNode;
}

const DroppableFrame = ({ id, children }: DroppableFrameArg) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: blue[50],
        padding: "10px",
        margin: "10px",
        minHeight: "100px",
      }}
    >
      {children}
    </Box>
  );
};

export default DroppableFrame;
