import getPermutaion from "../utils/getPermutation";

describe("test for getPermutation", () => {
  it("empty return empty", () => {
    const res = getPermutaion([], [], []);
    expect(res).toStrictEqual([]);
  });
});
