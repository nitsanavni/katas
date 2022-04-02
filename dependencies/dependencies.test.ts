import test from "ava";
import fc from "fast-check";
import { inspect } from "util";

type Deps = [number, number][];

const keys = (deps: Deps) =>
  Object.keys(
    deps.flat().reduce((a, c) => ({ ...a, ...{ [c]: undefined } }), {})
  )
    .filter((n) => n != "undefined")
    .map((k) => +k);

const clone = <T>(src: T): T =>
  (src as unknown as unknown[]).length
    ? (src as unknown as unknown[]).map(clone)
    : (src as unknown as any);

const resolve = (deps: Deps) => {
  const res = [];

  const ds = clone(deps);

  const resolved = (ds: Deps, k: number) =>
    undefined == ds.find(([a]) => a == k);

  const clear = (ds: Deps, k: number) => {
    let c = 0;
    for (let i = 0; i - c < ds.length; i++) {
      const [a, b] = ds[i - c];
      // console.log({ a, b, ds, i, c });
      if (a == k) {
        ds.splice(i - c, 1);
        c++;
      } else if (b == k) {
        if (a == undefined) {
          ds.splice(i - c, 1);
          c++;
        } else {
          ds[i - c] = [undefined as unknown as number, a];
        }
      }
    }
  };

  const log = (ds: Deps) => console.log(inspect(ds));

  while (ds.length > 0) {
    // for (let i = 0; i < 5; i++) {
    const r = keys(ds).filter((k) => resolved(ds, k));
    // console.log(r);
    // log(ds);
    if (r.length == 0) {
      // circular dependency
      return [];
    }
    res.push(...r);
    r.forEach((k) => clear(ds, k));
  }

  return res;
};

const circular = (deps: Deps, log: typeof console.log = () => {}) => {
  const circlesBackToItself = (e: number) => {
    let f = [e];

    for (let i = 0; i < deps.length + 1; i++) {
      const d = deps.filter(([, b]) => f.some((x) => x == b));

      log(inspect({ f, d, e, i }));

      if (d.length > 0) {
        f = d.map(([a]) => a);

        if (f.some((x) => x == e)) {
          return true;
        }
      } else {
        return false;
      }
    }

    return false;
  };

  return deps.flat().some(circlesBackToItself);
};

test("circular dependencies detected correctly", (t) => {
  const { failed, counterexample } = fc.check(
    fc.property(
      fc
        .set(
          fc
            .tuple(
              fc.integer({ min: 0, max: 30 }),
              fc.integer({ min: 0, max: 30 })
            )
            .filter(([a, b]) => a != b),
          {
            compare: ([a1, b1], [a2, b2]) =>
              (a1 == a2 && b1 == b2) || (a1 == b2 && a2 == b1),
          }
        )
        .filter(circular),
      (deps) => {
        const res = resolve(deps);

        // console.log(inspect({ res, deps }));

        return res.length == 0;
      }
    ),
    { numRuns: 1000 }
  );

  t.false(failed, inspect(counterexample));
});

const not =
  <P>(f: (p: P) => boolean) =>
  (p: P) =>
    !f(p);

test("solution order respects input dependencies", (t) => {
  const { failed, counterexample } = fc.check(
    fc.property(
      fc
        .set(
          fc
            .tuple(
              fc.integer({ min: 0, max: 30 }),
              fc.integer({ min: 0, max: 30 })
            )
            .filter(([a, b]) => a != b),
          { compare: ([a1, b1], [a2, b2]) => a1 == a2 && b1 == b2 }
        )
        .filter(not(circular)),
      (deps) => {
        const res = resolve(deps);

        // console.log(inspect({ res, deps }));

        return deps.every(
          ([a, b]) =>
            res.findIndex((e) => e == a) > res.findIndex((e) => e == b)
        );
      }
    )
  );

  t.false(failed, inspect(counterexample));
});

test("same number of elements", (t) => {
  const { failed, counterexample } = fc.check(
    fc.property(
      fc
        .set(
          fc
            .tuple(
              fc.integer({ min: 0, max: 30 }),
              fc.integer({ min: 0, max: 30 })
            )
            .filter(([a, b]) => a != b),
          { compare: ([a1, b1], [a2, b2]) => a1 == a2 && b1 == b2 }
        )
        .filter(not(circular)),
      (deps) => {
        const res = resolve(deps);

        // console.log(inspect({ res, deps }));

        return res.length === keys(deps).length;
      }
    )
  );

  if (counterexample) {
    const [c] = counterexample;
    console.log(inspect({ c, circ: circular(c, console.log) }));
  }

  t.false(failed, inspect({ counterexample }, false, 5));
});
