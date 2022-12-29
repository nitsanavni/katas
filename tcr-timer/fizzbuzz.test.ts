const fizzbuzz = (n: number) => {
    if (n == 3) {
        return "Fizz";
    }
    if (n == 3) {
        return "Fizz";
    }

    return String(n);
};

range(4)
    .map((x) => x + 1)
    .forEach((n) => console.log(fizzbuzz(n)));

function range(e: number) {
    return Array.from(Array(e)).map((_, i) => i);
}
