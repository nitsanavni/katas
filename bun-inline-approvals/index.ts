import { EOL } from "os";

type Log = typeof console.log;
type CB = (log: Log) => void;
type Tests = Record<string, CB>;

const fizzbuzz = (n: number) => (n == 3 ? "Fizz" : n);

const tests: Tests = {
    _test1: (log) => {
        // 1
        log(fizzbuzz(1));
    },
    _test2: (l) => l(fizzbuzz(2)),
    // 2
    _test3: (l) => l(fizzbuzz(3)),
    // Fizz
};

let inTest = false;

const lines = (await Bun.file(new URL(import.meta.url)).text()).split(EOL);

lines.forEach((line) => {
    if (inTest) {
        if (/^ *\/\//.test(line)) {
            // don't print comments that follow test methods
            return;
        } else {
            // no more comments
            inTest = false;
        }
    }
    console.log(line);
    const method = /_test\w+/.exec(line)?.[0] as keyof typeof tests;
    if (method && tests[method]) {
        inTest = true;
        tests[method]((...data) => console.log(...["        //", ...data]));
    }
});
