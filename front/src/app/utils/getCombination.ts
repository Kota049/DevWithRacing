const getCombination = (
  firstChoices: number[],
  secondChoices: number[],
  thirdChoices?: number[]
): number[][] => {
  firstChoices = removeDuplicated(firstChoices);
  secondChoices = removeDuplicated(secondChoices);
  if (typeof thirdChoices == "undefined") {
    return getCombination2(firstChoices, secondChoices, []);
  }
  thirdChoices = removeDuplicated(thirdChoices);

  let res: number[][] = [];
  for (const i1 of firstChoices) {
    secondChoices = exclude(secondChoices, i1);
    thirdChoices = exclude(thirdChoices, i1);
    const currentRes = [i1];
    res = [...res, ...getCombination2(secondChoices, thirdChoices, currentRes)];
  }
  return res;
};

const getCombination2 = (
  s: number[],
  l: number[],
  currentRes: number[]
): number[][] => {
  let res = [];
  for (const i2 of s) {
    l = exclude(l, i2);
    for (const i3 of l) {
      res.push([...currentRes, i2, i3]);
    }
  }
  return res;
};

const exclude = (array: number[], el: number): number[] => {
  return array.filter((i) => i != el);
};

const removeDuplicated = (array: number[]) => {
  return [...new Set(array)];
};

export default getCombination;
