const getPermutaion = (
  firstChoices: number[],
  secondChoices?: number[],
  thirdChoices?: number[]
): number[][] => {
  return [...firstChoices.map((el) => [el])];
};

export default getPermutaion;
