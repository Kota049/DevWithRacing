const getCombination3 = (
  f: number[],
  s: number[],
  l: number[] = []
): number[][] => {
  f = removeDuplicated(f);
  s = removeDuplicated(s);
  if (l.length == 0) {
    return getCombination2(f, s, []);
  }
  l = removeDuplicated(l);

  let res: number[][] = [];
  for (const i1 of f) {
    s = exclude(s, i1);
    l = exclude(l, i1);
    const currentRes = [i1];
    res = [...res, ...getCombination2(s, l, currentRes)];
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

export default getCombination3;
