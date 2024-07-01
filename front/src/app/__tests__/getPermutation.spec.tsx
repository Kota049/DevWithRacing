import getPermutation from "../utils/getPermutation";

describe("test for getPermutation", () => {
  it("return empty if all arg are empty", () => {
    const res = getPermutation([], [], []);
    expect(res).toStrictEqual([]);
  });
  it("return first choices if args only first", () => {
    const res = getPermutation([1, 2]);
    expect(res).toContainEqual([1]);
    expect(res).toContainEqual([2]);
  });
  it("return first choices without duplicated if args only first", () => {
    const res = getPermutation([2, 2]);
    expect(res).toContainEqual([2]);
    expect(res.length).toBe(1);
  });
  it("return permutation  if args has first & second", () => {
    const res = getPermutation([1, 2], [3, 4]);
    expect(res).toContainEqual([1, 3]);
    expect(res).toContainEqual([1, 4]);
    expect(res).toContainEqual([2, 3]);
    expect(res).toContainEqual([2, 4]);
    expect(res.length).toBe(4);
  });
  it("return permutation exclude same numbers pattern if args has first & second", () => {
    const res = getPermutation([1, 2], [1, 2]);
    expect(res).toContainEqual([1, 2]);
    expect(res).toContainEqual([2, 1]);
    expect(res).not.toContainEqual([1, 1]);
    expect(res).not.toContainEqual([2, 2]);
    expect(res.length).toBe(2);
  });
  it("return permutation without duplicated  if args has first & second", () => {
    const res = getPermutation([1, 1], [2, 2]);
    expect(res).toContainEqual([1, 2]);
    expect(res.length).toBe(1);
  });
  it("return permutation if args has first & second & third", () => {
    const res = getPermutation([1, 2], [3, 4], [5, 6]);
    expect(res).toContainEqual([1, 3, 5]);
    expect(res).toContainEqual([1, 3, 6]);
    expect(res).toContainEqual([1, 4, 5]);
    expect(res).toContainEqual([1, 4, 6]);
    expect(res).toContainEqual([2, 3, 5]);
    expect(res).toContainEqual([2, 3, 6]);
    expect(res).toContainEqual([2, 4, 5]);
    expect(res).toContainEqual([2, 4, 6]);
    expect(res.length).toBe(8);
  });
  it("return permutation exclude same numbers pattern if args has first & second & third", () => {
    const res = getPermutation([1, 2, 3], [1, 2, 3], [1, 2, 3]);
    expect(res).toContainEqual([1, 2, 3]);
    expect(res).toContainEqual([1, 3, 2]);
    expect(res).toContainEqual([2, 1, 3]);
    expect(res).toContainEqual([2, 3, 1]);
    expect(res).toContainEqual([3, 1, 2]);
    expect(res).toContainEqual([3, 2, 1]);
    expect(res.length).toBe(6);
  });
  it("return permutation without duplicated  if args has first & second & third", () => {
    const res = getPermutation([1, 1], [2, 2], [3, 3]);
    expect(res).toContainEqual([1, 2, 3]);
    expect(res.length).toBe(1);
  });
});
