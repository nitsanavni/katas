export const filter = <T>(
  arr: T[],
  predicate: (t: T, index: number) => boolean,
  startIndex: number,
  endIndex: number
): [T, number][] => {
  const ret: [T, number][] = [];

  for (let i = startIndex; i < Math.min(arr.length, endIndex); i++) {
    const item = arr[i];
    if (predicate(item, i)) ret.push([item, i]);
  }

  return ret;
};

export default filter;
