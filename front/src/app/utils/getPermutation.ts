import { removeDuplicated } from "./getCombination";

const getPermutation = (
  firstChoices: number[],
  secondChoices?: number[],
  thirdChoices?: number[],
  currentRes?: number[][]
): number[][] => {
  const firstChoicesWithoutDuplicated = removeDuplicated(firstChoices);
  let res: number[][] = [];
  for (const i1 of firstChoicesWithoutDuplicated) {
    if (typeof currentRes != "undefined") {
      for (const cp of currentRes) {
        if (!cp.includes(i1)) {
          res.push([...cp, i1]);
        }
      }
      continue;
    }
    res.push([i1]);
  }

  if (typeof secondChoices == "undefined") {
    return res;
  }

  return getPermutation(
    (firstChoices = secondChoices),
    (secondChoices = thirdChoices),
    (thirdChoices = undefined),
    (currentRes = res)
  );
};

export default getPermutation;
