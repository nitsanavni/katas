const specs = [
    { divisor: 3, code: "Fizz" },
    { divisor: 5, code: "Buzz" },
    { divisor: 7, code: "Whizz" },
];

const fizzbuzz = (n: number): string => {
    return (
        specs
            .filter(({ divisor }) => n % divisor == 0)
            .map(({ code }) => code)
            .join("") || String(n)
    );
};

range(35)
    .map((x) => x + 1)
    .map(fizzbuzz)
    .forEach((result) => console.log(result));

function range(e: number): number[] {
    return Array.from(Array(e)).map((_, i) => i);
}
