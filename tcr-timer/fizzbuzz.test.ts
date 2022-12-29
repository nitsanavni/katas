const fizzbuzz = (n: number) => {
    const fizz = { divisor: 3, code: "Fizz" };
    const buzz = { divisor: 5, code: "Buzz" };

    const specs = [fizz, buzz];

    return (
        specs
            .filter(({ divisor }) => n % divisor == 0)
            .map(({ code }) => code)
            .join("") || String(n)
    );
};

range(35)
    .map((x) => x + 1)
    .forEach((n) => console.log(fizzbuzz(n)));

function range(e: number) {
    return Array.from(Array(e)).map((_, i) => i);
}
