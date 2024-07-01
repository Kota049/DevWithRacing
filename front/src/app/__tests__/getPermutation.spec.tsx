import getPermutaion from "../utils/getPermutation";

describe("test for getPermutation", () => {
  it("return empty if all arg are empty", () => {
    const res = getPermutaion([], [], []);
    expect(res).toStrictEqual([]);
  });
  it("return first choices if args only first", () => {
    const res = getPermutaion([1, 2]);
    expect(res).toContainEqual([1]);
    expect(res).toContainEqual([2]);
  });
});
