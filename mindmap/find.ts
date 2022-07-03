export const find = <T>(
  arr: T[],
  predicate: (t: T) => boolean,
  startIndex = 0
): [T, number] | undefined => {
  for (let i = startIndex; i < arr.length; i++) {
    const item = arr[i];
    if (predicate(item)) return [item, i];
  }
};

export default find;
