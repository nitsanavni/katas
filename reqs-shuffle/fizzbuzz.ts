export const makeCounter =
    (i = 0) =>
    () =>
        i++;

const isWhizz = (n: number) => n % 7 == 0 || /7/.test(String(n));
const isFizz = (n: number) => n % 3 == 0;

export const pureFizzbuzz = (n: number) =>
    isFizz(n) ? "Fizz" : isWhizz(n) ? "Whizz" : n;

export const makeFizzbuzz = () => {
    const counter = makeCounter(1);

    return () => {
        return pureFizzbuzz(counter());
    };
};
