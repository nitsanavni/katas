export const makeCounter =
    (i = 0) =>
    () =>
        i++;

export const pureFizzbuzz = (n: number) =>
    n % 3 == 0
        ? "Fizz"
        : n % 7 == 0
        ? "Whizz"
        : /7/.test(String(n))
        ? "Whizz"
        : n;

export const makeFizzbuzz = () => {
    const counter = makeCounter(1);

    return () => {
        return pureFizzbuzz(counter());
    };
};
