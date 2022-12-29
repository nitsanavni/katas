const fizzbuzz = (n: number) => {
    if (n == 3) {
        return "Fizz";
    }
    if (n == 5) {
        return "Buzz";
    }

    return String(n);
};

range(5)
    .map((x) => x + 1)
    .forEach((n) => console.log(fizzbuzz(n)));

function range(e: number) {
    return Array.from(Array(e)).map((_, i) => i);
}
