const fizzbuzz = (n: number) => String(n);

console.log(fizzbuzz(1));

function range(e: number) {
    Array.from(Array(e)).map((_, i) => i);
}
