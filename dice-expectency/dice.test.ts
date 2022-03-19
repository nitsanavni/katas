import test from "ava";
import _ from "lodash";
import chalk from "chalk";

type Face = 0 | 1 | 2 | 3 | 4 | 5;

const roll = (): Face => _.random(5) as Face;

const rollUntilSeenAll = () => {
  const got: [boolean, boolean, boolean, boolean, boolean, boolean] = [
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  let i = 0;

  for (; !_.every(got); i++) {
    got[roll()] = true;
  }

  return i;
};

const histogram = (n: number) => {
  const h: number[] = [];

  _.times(n, () => {
    const i = rollUntilSeenAll();
    h[i] ??= 0;
    h[i]++;
  });

  return _.map(h, (x) => x ?? 0);
};

test("random", (t) => {
  const runs = 1000000;
  const h = histogram(runs);

  const half: number = (() => {
    let acc = 0;
    for (const [i, x] of h.entries()) {
      acc += x;
      if (acc > runs / 2) {
        return i;
      }
    }
    return 0;
  })();

  const max: number = _.max(h)!;
  const pad = String(max).length;

  const red = chalk.red;
  const blue = chalk.blue;

  console.log(
    _.chain(h)
      .map((x) => [_.floor((99 * x) / max), x])
      .filter(([, x], i) => i <= 6 || x !== 0)
      .map(([n, x], i) =>
        (i == half || i == half - 1 ? red : blue)(
          `${String(i).padStart(2, " ")} ${String(
            ((100 * x) / runs).toFixed(4)
          )}% ${_.times(n, () => "█").join("")}`
        )
      )
      .join("\n")
      .value()
  );

  t.deepEqual(h[0], 1);
});
