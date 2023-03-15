export const makeCounter =
    (i = 0) =>
    () =>
        i++;

const isWhizz = (n: number) => n % 7 == 0 || /7/.test(String(n));

export const pureFizzbuzz = (n: number) =>
    n % 3 == 0 ? "Fizz" : isWhizz(n) ? "Whizz" : n;

export const makeFizzbuzz = () => {
    const counter = makeCounter(1);

    return () => {
        return pureFizzbuzz(counter());
    };
};
