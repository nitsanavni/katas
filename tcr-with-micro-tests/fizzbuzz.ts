export const isMultipleOf = (d: number) => (n: number) => n % d == 0;

export const code = ({ d, code }: { d: number; code: string }) => {
    const mul = isMultipleOf(d);

    return (n: number) => (mul(n) ? code : "");
};

export const arr = (...specs: { d: number; code: string }[]) => {
    const fs = specs.map(code);

    return (n: number) => fs.map((f) => f(n));
};

export const codes = (...specs: { d: number; code: string }[]) => {
    const a = arr(...specs);

    return (n: number) => a(n).join("");
};

export const game = (...specs: { d: number; code: string }[]) => {
    const c = codes(...specs);

    return (n: number) => c(n) || n;
};
