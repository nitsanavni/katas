const fizzbuzz = (n: number) => {
    let ret = "";

    const fizz = { divisor: 3, code: "Fizz" };
    const buzz = { divisor: 5, code: "Buzz" };

    if (n % fizz.divisor == 0) {
        ret += fizz.code;
    }

    if (n % buzz.divisor == 0) {
        ret += "Buzz";
    }

    return ret || String(n);
};

range(35)
    .map((x) => x + 1)
    .forEach((n) => console.log(fizzbuzz(n)));

function range(e: number) {
    return Array.from(Array(e)).map((_, i) => i);
}
