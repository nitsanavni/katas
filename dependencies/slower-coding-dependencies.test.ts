import test from "ava";
import { inspect } from "util";

type Deps = [number, number][];
type Index = number;

const next =
  (deps: Deps) =>
  (is: Index[]): Index[] =>
    is.flatMap((f) =>
      deps
        .map(([a], i) => [a, i])
        .filter(([a]) => a == deps[f][1])
        .map(([a, i]) => i)
    );

test("next", (t) => {
  const specs: { deps: Deps; from: Index[]; to: Index[] }[] = [
    { deps: [[1, 1]], from: [0], to: [0] },
    { deps: [[1, 2]], from: [0], to: [] },
    {
      deps: [
        [1, 2],
        [2, 1],
      ],
      from: [0],
      to: [1],
    },
    {
      deps: [
        [1, 2],
        [2, 1],
      ],
      from: [1],
      to: [0],
    },
    {
      deps: [
        [1, 2],
        [2, 1],
        [1, 4],
        [1, 5],
      ],
      from: [1],
      to: [0, 2, 3],
    },
  ];

  specs.forEach(({ deps, from, to }) =>
    t.deepEqual(next(deps)(from), to, inspect({ deps, from, to }))
  );
});

const circlesBackToItself =
  (deps: Deps) =>
  (i: Index): boolean => {
    let n = [i];

    const _next = next(deps);

    for (let it = 0; it < deps.length; it++) {
      n = _next(n);

      if (n.some((x) => x == i)) {
        return true;
      }
    }

    return false;
  };

test("circlesBackToItself", (t) => {
  const specs: { deps: Deps; i: Index; expected: boolean }[] = [
    { deps: [[1, 2]], i: 0, expected: false },
    { deps: [[1, 1]], i: 0, expected: true },
    {
      deps: [
        [1, 2],
        [2, 1],
      ],
      i: 0,
      expected: true,
    },
    {
      deps: [
        [7, 8],
        [1, 2],
        [2, 3],
        [3, 1],
      ],
      i: 2,
      expected: true,
    },
    {
      deps: [
        [7, 8],
        [1, 2],
        [2, 3],
        [3, 1],
      ],
      i: 0,
      expected: false,
    },
  ];

  specs.forEach(({ deps, i, expected }) =>
    t.is(circlesBackToItself(deps)(i), expected)
  );
});

const circular = (deps: Deps) => {
  const _circlesBackToItself = circlesBackToItself(deps);

  return deps.map((_, i) => i).some(_circlesBackToItself);
};

test("circular", (t) => {
  const specs: [Deps, boolean][] = [
    [
      [
        [1, 2],
        [2, 3],
        [3, 1],
      ],
      true,
    ],
    [[[1, 1]], true],
    [
      [
        [1, 2],
        [2, 1],
      ],
      true,
    ],
    [[[1, 2]], false],
    [
      [
        [1, 2],
        [1, 2],
      ],
      false,
    ],
    [
      [
        [1, 2],
        [2, 3],
      ],
      false,
    ],
    [
      [
        [1, 2],
        [3, 4],
      ],
      false,
    ],
    [[], false],
  ];

  specs.forEach(([deps, expected]) =>
    t.is(circular(deps), expected, inspect({ deps, expected }))
  );
});
