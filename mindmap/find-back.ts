export const findBack = <T>(
  arr: T[],
  predicate: (t: T) => boolean,
  startIndex = arr.length - 1
): [T, number] | undefined => {
  for (let i = startIndex; i >= 0; i--) {
    const item = arr[i];
    if (predicate(item)) return [item, i];
  }
};

export default findBack;
