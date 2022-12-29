const fizzbuzz = (n: number) => {
    let ret = "";

    const fizz = { divisor: 3, code: "Fizz" };
    const buzz = { divisor: 5, code: "Buzz" };

    const specs = [fizz, buzz];

    ret = specs
        .filter(({ divisor }) => n % divisor == 0)
        .map(({ code }) => code)
        .join("");

    // if (n % fizz.divisor == 0) {
    //     ret += fizz.code;
    // }

    // if (n % buzz.divisor == 0) {
    //     ret += buzz.code;
    // }

    return ret || String(n);
};

range(35)
    .map((x) => x + 1)
    .forEach((n) => console.log(fizzbuzz(n)));

function range(e: number) {
    return Array.from(Array(e)).map((_, i) => i);
}
