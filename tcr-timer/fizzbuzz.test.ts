const fizzbuzz = (n: number) => {
    let ret = "";
    if (n % 15 == 0) {
        return "FizzBuzz";
    }
    if (n % 3 == 0) {
        ret += "Fizz";
    }
    if (n % 5 == 0) {
        ret += "Buzz";
        return "Buzz";
    }

    return ret || String(n);
};

range(35)
    .map((x) => x + 1)
    .forEach((n) => console.log(fizzbuzz(n)));

function range(e: number) {
    return Array.from(Array(e)).map((_, i) => i);
}
