type ProductTuple<T extends any[][]> = {
    [K in keyof T]: T[K] extends (infer U)[] ? U : never;
};

export function product<T extends any[][]>(...arrays: T): ProductTuple<T>[] {
    if (arrays.length === 0) return [];

    const result: ProductTuple<T>[] = [];
    const counters = new Array(arrays.length).fill(0);

    while (counters[0] < arrays[0].length) {
        const tuple: any[] = [];
        for (let i = 0; i < arrays.length; i++) {
            tuple.push(arrays[i][counters[i]]);
        }
        result.push(tuple as ProductTuple<T>);

        for (let i = arrays.length - 1; i >= 0; i--) {
            counters[i]++;
            if (counters[i] === arrays[i].length && i !== 0) {
                counters[i] = 0;
            } else {
                break;
            }
        }
    }

    return result;
}
