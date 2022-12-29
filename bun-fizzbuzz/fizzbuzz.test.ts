import { debug as d } from "debug";
const debug = d("fizzbuzz");

// log debug statements to stdout, to intentionally interfere with our approval test
debug.log = console.log.bind(console);

const specs = [
    { divisor: 3, code: "Fizz" },
    { divisor: 5, code: "Buzz" },
    { divisor: 7, code: "Whizz" },
];

const fizzbuzz = (n: number): string => {
    return (
        specs
            .filter(({ divisor }) => n % divisor == 0)
            .filter((s) => {
                debug({ ...s, n });
                return true;
            })
            .map(({ code }) => code)
            .join("") || String(n)
    );
};

range(35)
    .map((x) => x + 1)
    .map((n) => [n, fizzbuzz(n)])
    .forEach(([n, result]) => console.log(`! ${n} -> ${result}`));

function range(e: number): number[] {
    return Array.from(Array(e)).map((_, i) => i);
}
