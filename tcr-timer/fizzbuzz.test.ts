const fizzbuzz = (n: number) => {
    let ret = "";

    const divisor = 3;
    const code = "Fizz";

    const fizz = { divisor: 3, code: "Fizz" };

    if (n % fizz.divisor == 0) {
        ret += fizz.code;
    }

    if (n % 5 == 0) {
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
