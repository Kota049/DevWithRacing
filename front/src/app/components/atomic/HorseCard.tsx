"use client";
import { useDraggable } from "@dnd-kit/core";
import { Card, CardHeader, Avatar } from "@mui/material";
import { red } from "@mui/material/colors";

interface HorseCardArg {
  order: number;
  name: string;
  jockey: string;
  id: string;
}

const HorseCard = ({ order, name, jockey, id }: HorseCardArg) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card sx={{ maxWidth: 345 }}>
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
