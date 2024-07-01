"use client";
import { useDraggable } from "@dnd-kit/core";
import { Card, CardHeader, Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import zIndex from "@mui/material/styles/zIndex";

interface HorseCardArg {
  order: number;
  name: string;
  jockey: string;
  id: string;
  isValid: boolean;
}

const HorseCard = ({ order, name, jockey, id, isValid }: HorseCardArg) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: "2",
      }
    : undefined;
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card sx={{ maxWidth: 345, opacity: isValid ? 1 : 0.5 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar">
              {order}
            </Avatar>
          }
          title={name}
          subheader={jockey}
        />
      </Card>
    </div>
  );
};

export default HorseCard;
