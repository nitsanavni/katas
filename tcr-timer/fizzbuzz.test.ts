const fizzbuzz = (n: number) => {
    if (n % 3 == 0) {
        return "Fizz";
    }

    if (n % 5 == 0) {
        return "Buzz";
    }

    return String(n);
};

range(14)
    .map((x) => x + 1)
    .forEach((n) => console.log(fizzbuzz(n)));

function range(e: number) {
    return Array.from(Array(e)).map((_, i) => i);
}
