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
  it("case has duplicated in f & s", () => {
    const arg = [[1], [1, 2], [3]];
    const res = getCombination({ f: arg[0], s: arg[1], l: arg[2] });
    expect(res).toContainEqual([1, 2, 3]);
    expect(res).not.toContainEqual([1, 1, 3]);
  });
  it("case has duplicated in f & l", () => {
    const arg = [[1], [2], [3, 1]];
    const res = getCombination({ f: arg[0], s: arg[1], l: arg[2] });
    expect(res).toContainEqual([1, 2, 3]);
    expect(res).not.toContainEqual([1, 2, 1]);
  });
  it("case has duplicated in s & l", () => {
    const arg = [[1], [2], [3, 2]];
    const res = getCombination({ f: arg[0], s: arg[1], l: arg[2] });
    expect(res).toContainEqual([1, 2, 3]);
    expect(res).not.toContainEqual([1, 2, 2]);
  });
});
