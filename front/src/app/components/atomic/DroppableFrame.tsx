"use client";
import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { ReactNode } from "react";

interface DroppableFrameArg {
  id: string;
  isValid: boolean;
  children: ReactNode;
}

const DroppableFrame = ({ id, children, isValid }: DroppableFrameArg) => {
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
        backgroundColor: isValid ? blue[50] : grey[600],
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
