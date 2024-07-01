const getPermutaion = (
  firstChoices: number[],
  secondChoices?: number[],
  thirdChoices?: number[]
): number[][] => {
  const firstWithoutDuplicated = [...new Set(firstChoices)];
  if (typeof secondChoices == "undefined") {
    return [...firstWithoutDuplicated.map((el) => [el])];
  }
  let res: number[][] = [];
  for (const i1 of firstChoices) {
    for (const i2 of secondChoices) {
      if (i1 === i2) {
        continue;
      }
      res.push([i1, i2]);
    }
  }
  return res;
};

export default getPermutaion;
