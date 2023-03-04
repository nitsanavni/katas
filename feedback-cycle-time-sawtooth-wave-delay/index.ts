import { sleep } from "bun";

const sinDelay = (ms: number) => {
    const cycle = 4 * 60 * 1000;
    const max_delay = 20 * 1000;
    const min_delay = 0;

    const s = Math.sin((2 * Math.PI * ms) / cycle);

    const result = ((s + 1) * (min_delay - max_delay)) / 2 + max_delay;

    console.error(s);
    console.error(Math.floor(result / 1000));
    return result;
};

await sleep(sinDelay(Date.now()));

console.log("fizzbuzz");
const part = (d: number, code: string) => (n: number) => n % d == 0 ? code : "";
const specs = [
    [3, "Fizz"],
    [5, "Buzz"],
    [7, "Whizz"],
    [11, "Bang"],
] as [number, string][];

const fizzbuzz = (n: number) => specs.map((p) => part(...p)(n)).join("") || n;

for (let n = 1; n <= 35; n++) {
    console.log(`${n} -> ${fizzbuzz(n)}`);
}
