const w = (lines: string[]): number => Math.max(...lines.map((l) => l.length));
const h = (lines: string[]): number => lines.length;

export const cat = (lhs: string[], rhs: string[]): string[] => {
  const lw = w(lhs);
  const lh = h(lhs);
  const rh = h(rhs);

  const ret: string[] = [];

  const mh = Math.max(lh, rh);

  for (let i = 0; i < mh; i++) {
    const li = i - ((mh - lh) >> 1);
    const ri = i - ((mh - rh) >> 1);

    const l = lhs[li] || "";
    const r = rhs[ri] || "";
    const p = "".padEnd(lw - l.length, " ");

    const singleLine = mh == 1;
    const firstLine = i == 0;
    const lastLine = i == mh - 1;

    const connector = singleLine ? "─" : firstLine ? "┌" : lastLine ? "└" : "│";

    ret.push(`${l}${p}${connector}${r}`);
  }

  return ret;
};

export default cat;
