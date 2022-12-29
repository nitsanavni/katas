const fizzbuzz = (n: number) => {
    let ret = "";

    const fizz = { divisor: 3, code: "Fizz" };
    const buzz = { divisor: 5, code: "Buzz" };

    const specs = [fizz, buzz];

    ret = specs
        .filter(({ divisor }) => n % divisor == 0)
        .map(({ code }) => code)
        .join("");

    return ret || String(n);
};

range(35)
    .map((x) => x + 1)
    .forEach((n) => console.log(fizzbuzz(n)));

function range(e: number) {
    return Array.from(Array(e)).map((_, i) => i);
}
