import { NextPage } from "next";
import Header from "./molecules/header";
import HorseCard from "./atomic/HorseCard";

const DebugPage: NextPage = () => {
  return <HorseCard order={0} name={"アルナシーム"} jockey={"鮫島克"} />;
};
export default DebugPage;
