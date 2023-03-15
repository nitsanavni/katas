export const makeSample =
    (random: () => number) =>
    (weights: number[]): number => {
        const r = random();
        const i = weights
            .map(
                (
                    (a = 0) =>
                    (w: number) =>
                        a + w
                )()
            )
            .findIndex((w) => r < w);

        return i == -1 ? weights.length : i;
    };

export const sample = makeSample(Math.random);
