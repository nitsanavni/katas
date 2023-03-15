import { sample } from "./sample.js";

const contains = (digit: number) => (n: number) =>
    new RegExp(String(digit)).test(String(n));

export const makePure =
    (sample: (weights: number[]) => number) => (n: number) =>
        n % 5 == 0
            ? "Buzz"
            : contains(7)(n)
            ? "Wizz"
            : n % 11 == 0
            ? ["Bang", "Zbang"][sample([0.9])]
            : n;

const pure = makePure(sample);

export const makeSelfCountingFizzbuzz = () => {
    let n = 1;

    return () => pure(n++);
};
