import { sleep } from "bun";

const delay = (ms: number) => {
    const two_minutes = 2 * 60 * 1000;
    const max_delay = 20 * 1000;
    const min_delay = 0;

    const result =
        ((ms % two_minutes) * (min_delay - max_delay)) / two_minutes +
        max_delay;

    console.error(Math.floor(result / 1000));
    return result;
};

await sleep(delay(Date.now()));
