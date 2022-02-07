import test from "ava";
import fc from "fast-check";
import { inspect } from "util";

function a(): void;
function a(p?: number): void {}

const compose =
  <T1, T2>(f1: (p: T1) => T2) =>
  <T3>(f2: (p: T2) => T3) =>
  (p: T1) =>
    f2(f1(p));

const flow2 = <T1, T2, T3>(m1: (p: T1) => T2, m2: (p: T2) => T3) =>
  compose(m1)(m2);

const flow3 = <T1, T2, T3, T4>(
  m1: (p: T1) => T2,
  m2: (p: T2) => T3,
  m3: (p: T3) => T4
) => compose(flow2(m1, m2))(m3);

const flow4 = <T1, T2, T3, T4, T5>(
  m1: (p: T1) => T2,
  m2: (p: T2) => T3,
  m3: (p: T3) => T4,
  m4: (p: T4) => T5
) => compose(flow3(m1, m2, m3))(m4);

// const flow = <
//   T1,
//   T2,
//   T3,
//   M1 extends ((p: T1) => T2) | undefined,
//   M2 extends ((p: T2) => T3) | undefined
// >(
//   m1: M1,
//   m2: M2
// ): ((p: T1) => T3) => {
//   if (m2) {
//     return flow2(m1!, m2) as any;
//   }

//   return m1 as any;
// };

const myFunc = <T extends false | undefined, P extends [] | [T]>(
  ...p: P
): P extends [] ? undefined : P extends [boolean] ? string : number => {
  if (typeof p == "string") {
    return undefined as any;
  } else {
    return 3 as any;
  }
};

myFunc();
myFunc(false);
myFunc(undefined);

const flow = <T1, T2, T3 = "♘", T4 = "♘", T5 = "♘", T6 = "♘">(
  f0: (p: T1) => T2,
  f1?: (p: T2) => T3,
  f2?: (p: T3) => T4,
  f3?: (p: T4) => T5
): ((p: T1) => T3 extends "♘" ? T2 : T4 extends "♘" ? T3 : T4) => {
  let ret: any = f0;

  for (const f of [f1, f2, f3]) {
    if (f) {
      ret = compose(ret)(f as any);
    }
  }

  return ret;
};

flow((x: number) => 2 * x);
flow(
  (x: number) => 2 * x,
  (x) => ""
);
flow(
  (x: number) => 2 * x,
  (x) => "",
  (x) => "",
  (x) => ""
);
flow(
  (x: number) => 2 * x,
  (x) => x,
  (x: number) => x
);
flow(() => false);
flow(
  (x: number) => 2 * x,
  (x) => `${2 * x}`
);
flow(
  (x: number) => 2 * x,
  (x) => `${2 * x}`,
  (x) => x + ""
);
flow(
  (x: number) => 2 * x,
  (x: string) => x
);

test("flow - scaffold", (t) => {
  flow((x: number) => 2 * x, undefined)(2);
});

const closestToZero = (arr: string[]): string | undefined => {
  let ret = arr[0];

  const similarityToZero = (str: string) =>
    "zero".split("").filter((letterInZero) => str.includes(letterInZero))
      .length;

  for (const str of arr) {
    if (similarityToZero(str) > similarityToZero(ret)) {
      ret = str;
    }
  }

  return ret;
};

test("contains some letters from 'zero'", (t) => {
  const { failed, counterexample } = fc.check(
    fc.property(
      fc.array(
        fc
          .string()
          .filter((s) =>
            "zero".split("").every((letter) => !s.includes(letter))
          )
      ),
      fc.array(
        fc
          .string()
          .filter((s) =>
            "zero".split("").every((letter) => !s.includes(letter))
          )
      ),
      fc
        .string()
        .filter((s) => "zero".split("").some((letter) => s.includes(letter))),
      (disimilarToZero, moreDisimilarToZero, similarToZero) => {
        return (
          similarToZero ==
          closestToZero([
            ...disimilarToZero,
            similarToZero,
            ...moreDisimilarToZero,
          ])
        );
      }
    )
  );

  t.false(failed, `counter: ${inspect(counterexample)}`);
});

test("'zero' is always closest to zero", (t) => {
  const { failed, counterexample } = fc.check(
    fc.property(
      fc.array(fc.string()),
      fc.array(fc.string()),
      (firstStrings, lastStrings) => {
        return (
          "zero" == closestToZero([...firstStrings, "zero", ...lastStrings])
        );
      }
    )
  );

  t.false(failed, `counter: ${inspect(counterexample)}`);
});

test("single element is closest", (t) => {
  const { failed, counterexample } = fc.check(
    fc.property(fc.string(), (str: string) => {
      return str == closestToZero([str]);
    })
  );

  t.false(failed, `counter: ${inspect(counterexample)}`);
});
