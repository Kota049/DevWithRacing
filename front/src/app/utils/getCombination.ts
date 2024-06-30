interface getCombinationArg {
  f: number[];
  s: number[];
  l: number[];
}

const getCombination = ({ f, s, l }: getCombinationArg): number[][] => {
  let res = [];
  for (const i1 of f) {
    for (const i2 of s) {
      for (const i3 of l) {
        res.push([i1, i2, i3]);
      }
    }
  }
  return res;
};

export default getCombination;
