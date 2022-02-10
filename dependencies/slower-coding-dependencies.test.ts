import test from "ava";
import { inspect } from "util";
import fc from "fast-check";

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

const not =
  <P>(f: (p: P) => boolean) =>
  (p: P) =>
    !f(p);

const uniq = <T>(arr: T[]): T[] =>
  arr.reduce<T[]>((acc, e) => [...acc, ...(acc.includes(e) ? [] : [e])], []);

test("uniq", (t) => {
  const specs: [number[], number[]][] = [
    [[1, 1], [1]],
    [
      [1, 2],
      [1, 2],
    ],
    [
      [1, 2, 2, 2],
      [1, 2],
    ],
    [[1], [1]],
  ];

  specs.forEach(([arr, u]) => t.deepEqual(uniq(arr), u));
});

const clone = <T>(arr: T): T =>
  (arr as unknown as unknown[]).map
    ? (arr as unknown as unknown[]).map(clone)
    : (arr as any);

test("clone", (t) => {
  const { failed } = fc.check(
    fc.property(
      fc.oneof(
        fc.array(fc.integer()),
        fc.array(fc.oneof(fc.integer(), fc.array(fc.integer()))),
        fc.array(
          fc.oneof(
            fc.integer(),
            fc.array(fc.oneof(fc.integer(), fc.array(fc.integer())))
          )
        )
      ),
      (arr) => clone(arr).flat(3).length == arr.flat(3).length
    )
  );

  t.false(failed);
});

const resolve = (deps: Deps): number[] => {
  return uniq(deps.flat());
};

const depsArbitrary = () =>
  fc.array(
    fc.tuple(fc.integer({ min: 0, max: 10 }), fc.integer({ min: 0, max: 10 }))
  );

const nonCircularDepsArbitrary = () => depsArbitrary().filter(not(circular));

const specs: [
  description: string,
  makeDepsArbitrary: typeof depsArbitrary,
  property: (deps: Deps, res: number[]) => boolean
][] = [
  [
    "elements in the solution are ordered according to dependencies",
    nonCircularDepsArbitrary,
    (deps, res) => deps.every(([a, b]) => res.indexOf(a) > res.indexOf(b)),
  ],
  [
    "no dups in the solution",
    nonCircularDepsArbitrary,
    (_, res) => res.length == uniq(res).length,
  ],
  [
    "all elements are in the solution",
    nonCircularDepsArbitrary,
    (deps, res) => deps.flat().every((e) => res.includes(e)),
  ],
];

specs.forEach(([desc, makeArbitrary, prop]) =>
  test(desc, (t) => {
    const { failed, counterexample } = fc.check(
      fc.property(makeArbitrary(), (deps) => prop(deps, resolve(deps)))
    );

    t.false(failed, inspect(counterexample));
  })
);
