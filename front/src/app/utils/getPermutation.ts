const getPermutaion = (
  firstChoices: number[],
  secondChoices?: number[],
  thirdChoices?: number[]
): number[][] => {
  const firstWithoutDuplicated = [...new Set(firstChoices)];
  if (typeof secondChoices == "undefined") {
    return [...firstWithoutDuplicated.map((el) => [el])];
  }
  const secondWithoutDuplicated = [...new Set(secondChoices)];
  let res: number[][] = [];
  for (const i1 of firstWithoutDuplicated) {
    for (const i2 of secondWithoutDuplicated) {
      if (i1 === i2) {
        continue;
      }
      res.push([i1, i2]);
    }
  }
  return res;
};

export default getPermutaion;
