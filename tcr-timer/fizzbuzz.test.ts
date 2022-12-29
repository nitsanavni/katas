const fizzbuzz = (n: number) => String(n);

range(1).map((x) => x + 1);
console.log(fizzbuzz(1));

function range(e: number) {
    return Array.from(Array(e)).map((_, i) => i);
}
