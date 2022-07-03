export const range = (end: number): number[] => {
  const ret: number[] = [];

  for (let i = 0; i < end; i++) {
    ret.push(i);
  }

  return ret;
};

export default range;
