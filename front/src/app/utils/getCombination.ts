interface getCombinationArg {
  f: number[];
  s: number[];
  l: number[];
}

const getCombination = ({ f, s, l }: getCombinationArg): number[][] => {
  f = [...new Set(f)];

  let res = [];
  for (const i1 of f) {
    s = exclude(s, i1);
    l = exclude(l, i1);
    for (const i2 of s) {
      l = exclude(l, i2);
      for (const i3 of l) {
        res.push([i1, i2, i3]);
      }
    }
  }
  return res;
};

const exclude = (array: number[], el: number): number[] => {
  return array.filter((i) => i != el);
};

export default getCombination;
