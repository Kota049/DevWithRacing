function makeKey(o: string, o2?: string | null, o3?: string | null): string {
  if (typeof o2 === "undefined") {
    return o;
  }
  if (typeof o3 === "undefined") {
    return `${o}_${o2}`;
  }
  return `${o}_${o2}_${o3}`;
}

export default makeKey;
