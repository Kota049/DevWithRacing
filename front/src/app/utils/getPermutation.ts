const getPermutaion = (
  firstChoices: number[],
  secondChoices?: number[],
  thirdChoices?: number[]
): number[][] => {
  const firstWithoutDuplicated = [...new Set(firstChoices)];
  return [...firstWithoutDuplicated.map((el) => [el])];
};

export default getPermutaion;
