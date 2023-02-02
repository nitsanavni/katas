const product_2 = (a1: any[][], a2: any[]): any[][] =>
    a1[0]?.length == 0
        ? a2.map((e2) => [e2])
        : a1.flatMap((e1) => a2.map((e2) => [...e1, e2]));

export const product = (...arrs: any[][]): any[][] => {
    let ret: any[][] = [[]];

    for (const a of arrs) {
        ret = product_2(ret, a);
    }

    return ret;
};

export default product;
