const getCombination = (
  firstChoices: number[],
  secondChoices?: number[],
  thirdChoices?: number[]
): number[][] => {
  firstChoices = removeDuplicated(firstChoices);
  secondChoices = removeDuplicated(secondChoices!);
  if (typeof thirdChoices == "undefined") {
    return getCombination2(firstChoices, secondChoices, []);
  }
  thirdChoices = removeDuplicated(thirdChoices);

  let res: number[][] = [];
  for (const i1 of firstChoices) {
    const currentRes = [i1];
    res = [
      ...res,
      ...getCombination2(secondChoices, thirdChoices, currentRes).map((el) =>
        el.sort((a, b) => a - b)
      ),
    ];
  }
  return [
    ...res.filter(
      (element, index, self) =>
        self.findIndex((e) => JSON.stringify(e) === JSON.stringify(element)) ===
        index
    ),
  ];
};

const getCombination2 = (
  s: number[],
  l: number[],
  currentRes: number[]
): number[][] => {
  let res = [];
  for (const i2 of s) {
    if (currentRes.includes(i2)) {
      continue;
    }
    for (const i3 of l) {
      if (currentRes.includes(i3)) {
        continue;
      }
      if (i2 === i3) {
        continue;
      }
      res.push([...currentRes, i2, i3].sort((a, b) => a - b));
    }
  }
  return [
    ...res.filter(
      (element, index, self) =>
        self.findIndex((e) => JSON.stringify(e) === JSON.stringify(element)) ===
        index
    ),
  ];
};

export const removeDuplicated = (array: number[]) => {
  return [...new Set(array)];
};

export default getCombination;
