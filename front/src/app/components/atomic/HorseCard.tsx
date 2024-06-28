import { Card, CardHeader, Avatar, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";

interface HorseCardArg {
  order: number;
  name: string;
  jockey: string;
}

const HorseCard = ({ order, name, jockey }: HorseCardArg) => {
  return (
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
  );
};

export default HorseCard;
