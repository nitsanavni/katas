export const makeCounter =
    (i = 0) =>
    () =>
        i++;

export const pure = (n: number) =>
    n % 7 == 0 ? "Whizz" : /7/.test(String(n)) ? "Whizz" : n;

export const makeFizzbuzz = () => {
    const counter = makeCounter(1);

    return () => {
        return pure(counter());
    };
};
