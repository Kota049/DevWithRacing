import { Avatar, Box } from "@mui/material";
import { green } from "@mui/material/colors";

interface BettingCombinationArg {
  first: number;
  second: number;
  third?: number;
}
const BettingCombination = ({
  first,
  second,
  third,
}: BettingCombinationArg) => {
  return (
    <Box display={"flex"} sx={{ backgroundColor: green[50] }} padding={"10px"}>
      <Avatar>{first}</Avatar>
      <Avatar>{second}</Avatar>
      {third ? <Avatar>{third}</Avatar> : null}
    </Box>
  );
};

export default BettingCombination;
