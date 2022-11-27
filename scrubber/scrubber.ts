const counter =
    (_i = 0) =>
    () =>
        _i++;

export const scrubber =
    (pattern: RegExp) =>
    (input: string): string => {
        let ret = input;

        const i = counter();

        let found = {};

        // TODO - replace with 'reduce'
        while (pattern.test(ret)) {
            // TODO - this won't work with regex groups
            const f = pattern.exec(ret)?.[0]!;
            found[f] = found[f] ?? i();
            ret = ret.replace(pattern, `<${found[f]}>`);
        }

        return ret;
    };

export default scrubber;
