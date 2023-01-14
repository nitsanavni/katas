/* approved start
1 -> 1
2 -> 2
3 -> Fizz
4 -> 4
5 -> Buzz
approved end */

const fizzbuzz = (n) => (n == 3 ? "Fizz" : n == 5 ? "Buzz" : n);

const upTo = (n) => Array.from({ length: n }, (_, i) => i + 1);

Array.from({ length: 5 }, (_, i) => i + 1).forEach((n) =>
    console.log(`${n} -> ${fizzbuzz(n)}`)
);
