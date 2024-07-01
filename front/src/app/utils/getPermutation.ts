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
      if (typeof thirdChoices == "undefined") {
        res.push([i1, i2]);
        continue;
      }
      for (const i3 of thirdChoices) {
        if (i1 === i3 || i2 === i3) {
          continue;
        }
        res.push([i1, i2, i3]);
      }
    }
  }
  return res;
};

export default getPermutaion;
