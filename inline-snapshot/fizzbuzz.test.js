const range = (n) => Array.from({ length: n }, (_, i) => i);

test("fizzbuzz", () => {
    const fizzbuzz = (n) => (n == 3 ? "Fizz" : n);

    expect(
        range(4)
            .map((x) => x + 1)
            .map((n) => `${n} -> ${fizzbuzz(n)}`)
            .join("\n")
    ).toMatchInlineSnapshot(`
"1 -> 1
2 -> 2
3 -> Fizz
4 -> 4"
`);
});
