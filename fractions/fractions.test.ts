import { inspect } from "util";

// numerator, denominator, reduced, mixed number, proper, whole, part

// TODO - minus sign: -1 1/2
// TODO - tagged template literal

const l = console.log;

type Values = {
    part?: { numerator: number; denominator: number };
    whole?: number;
};

const parse = (s: string): Values => {
    const parts = s.split(" ");

    if (parts.length == 1) {
        const [n, d] = s.split("/");

        if (d) {
            return { part: { numerator: +n, denominator: +d } };
        } else {
            return { whole: +n };
        }
    } else {
        const [whole, part] = parts;
        const [n, d] = part.split("/");

        return { whole: +whole, part: { numerator: +n, denominator: +d } };
    }
};

const fraction = (s: string) => {
    const values = () => parse(s);
    const from = () => s;
    const reduce = () => {
        let { part, whole } = values();

        if (!part) {
            return fraction(s);
        }

        let { denominator: d, numerator: n } = part;

        if (d <= n) {
            const diff = Math.floor(n / d);
            whole = (whole || 0) + diff;
            n = n % d;
        }

        const cd = gcd(d, n);

        if (cd) {
            n = n / cd;
            d = d / cd;
        }

        return fraction(
            [
                ...(0 < (whole || 0) ? [`${whole}`] : []),
                ...(n != 0 ? [`${n}/${d}`] : []),
            ].join(" ") || "0"
        );
    };

    const add = (otro: string) => {
        const o = fraction(otro).values();
        const v = values();

        const whole = (o.whole || 0) + (v.whole || 0);
        const od = o.part ? o.part.denominator : 1;
        const on = o.part ? o.part.numerator : 0;
        const vd = v.part ? v.part.denominator : 1;
        const vn = v.part ? v.part.numerator : 0;

        const d = od * vd;
        const n = on * vd + vn * od;

        return fraction(`${whole} ${n}/${d}`).reduce();
    };

    return {
        values,
        from,
        reduce,
        add,
    };
};

const divisors = (n: number) => [
    ...range(Math.floor(n / 2))
        .map((x) => x + 2)
        .filter((d) => n % d == 0 && d < n),
    n,
];

const gcd = (a: number, b: number) => {
    const ad = divisors(a);
    const bd = divisors(b);

    return ad.filter((d) => bd.includes(d)).reverse()[0];
};

test("add", () => {
    [
        ["1/2", "1/2"],
        ["1/2", "3/3"],
        ["1/2", "4/3"],
        ["1/2", "1/3"],
        ["1 1/3", "4 1/6"],
        ["1", "1"],
        ["0", "0"],
    ]
        .map(([a, b]) => [[a, b], fraction(a).add(b).from()])
        .forEach((p) => l(p));
});

test("greatest common divisor", () => {
    [
        [4, 2],
        [2, 4],
        [2, 3],
        [12, 18],
        [15, 35],
    ]
        .map(([a, b]) => [[a, b], gcd(a, b)])
        .forEach((p) => l(p));
});

test("divisors", () => {
    range(11)
        .map((x) => x + 2)
        .map((n) => [n, divisors(n)])
        .forEach(([n, d]) => {
            l(n);
            l(d);
        });
});

test("range", () => {
    l(range(5));
});

test("reduce", () => {
    ["1/2", "2/4", "15/25", "33/111", "3/2", "1 5/4", "4/2", "1/1"]
        .map((s) => [s, fraction(s).reduce()] as const)
        .forEach(([s, reduced]) => {
            l(`${s} -> ${reduced.from()}`);
        });
});

test("value object", () => {
    ["1/2", "3 5/6"]
        .map((s) => fraction(s))
        .forEach((f) => {
            l("from", f.from());
            l("values", inspect(f.values()));
        });
});

test("parse", () => {
    ["1/2", "3/4", "5 3/4", "6", "2/4", "12/4"]
        .map((f) => [f, parse(f)])
        .forEach(([f, result]) => l(`${f} -> ${inspect(result)}`));
});

function test(name: string, cb: () => void) {
    l("---------------");
    l("test:", name);
    cb();
    l("");
}

function range(e: number) {
    return Array.from(Array(e)).map((_, i) => i);
}
