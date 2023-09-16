export const fbCalc = (n: number) => (n % 3 == 0 ? "Fizz" : "");

export const fbArrayInput = (a: number[]) => a.map(fbCalc);

export const fizzbuzz = fbArrayInput;
