import getCombination from "../utils/getCombination";

describe("getCombination", () => {
  it("case favorite has no element", () => {
    const arg = [[], [1, 2, 3], [1, 2, 3]];
    const res = getCombination({ f: arg[0], s: arg[1], l: arg[2] });
    expect(res).toStrictEqual([]);
  });
  it("case 1 pattern", () => {
    const arg = [[1], [2], [3]];
    const res = getCombination({ f: arg[0], s: arg[1], l: arg[2] });
    expect(res).toContainEqual([1, 2, 3]);
  });
  // it("case 2patern", () => {
  //   const arg = [[1], [2, 3], [4]];
  //   const res = getCombination({ f: arg[0], s: arg[1], l: arg[2] });
  //   expect(res).toStrictEqual([
  //     [1, 2, 4],
  //     [1, 3, 4],
  //   ]);
  // });
});
