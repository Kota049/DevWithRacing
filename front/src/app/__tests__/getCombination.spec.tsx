import getCombination from "../utils/getCombination";

describe("getCombination", () => {
  it("case favorite has no element", () => {
    const arg = [[], [1, 2, 3], [1, 2, 3]];
    const res = getCombination(arg[0], arg[1], arg[2]);
    expect(res).toStrictEqual([]);
  });
  it("case 1 pattern", () => {
    const arg = [[1], [2], [3]];
    const res = getCombination(arg[0], arg[1], arg[2]);
    expect(res).toContainEqual([1, 2, 3]);
  });
  it("case has duplicated in f & s", () => {
    const arg = [[1], [1, 2], [3]];
    const res = getCombination(arg[0], arg[1], arg[2]);
    expect(res).toContainEqual([1, 2, 3]);
    expect(res).not.toContainEqual([1, 1, 3]);
  });
  it("case has duplicated in f & l", () => {
    const arg = [[1], [2], [3, 1]];
    const res = getCombination(arg[0], arg[1], arg[2]);
    expect(res).toContainEqual([1, 2, 3]);
    expect(res).not.toContainEqual([1, 2, 1]);
  });
  it("case has duplicated in s & l", () => {
    const arg = [[1], [2], [3, 2]];
    const res = getCombination(arg[0], arg[1], arg[2]);
    expect(res).toContainEqual([1, 2, 3]);
    expect(res).not.toContainEqual([1, 2, 2]);
  });
  it("case has duplicated in f & f", () => {
    const arg = [[1, 1], [2], [3]];
    const res = getCombination(arg[0], arg[1], arg[2]);
    expect(res).toContainEqual([1, 2, 3]);
    expect(res.length).toStrictEqual(1);
  });
  it("case has duplicated in s & s", () => {
    const arg = [[1], [2, 2], [3]];
    const res = getCombination(arg[0], arg[1], arg[2]);
    expect(res).toContainEqual([1, 2, 3]);
    expect(res.length).toStrictEqual(1);
  });
  it("case has duplicated in l & l", () => {
    const arg = [[1], [2], [3, 3]];
    const res = getCombination(arg[0], arg[1], arg[2]);
    expect(res).toContainEqual([1, 2, 3]);
    expect(res.length).toStrictEqual(1);
  });
  it("case 2 combination", () => {
    const arg = [[1], [2]];
    const res = getCombination(arg[0], arg[1]);
    expect(res).toContainEqual([1, 2]);
  });
  it("case f has more element", () => {
    const arg = [[1, 3], [2], [1]];
    const res = getCombination(arg[0], arg[1], arg[2]);
    expect(res).toContainEqual([3, 2, 1]);
    expect(res.length).toStrictEqual(1);
  });
});
