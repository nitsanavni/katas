
export const last = <T>(arr: T[]): T | undefined => arr.length == 0 ? undefined : arr[arr.length - 1];

const inKnownRange = ({ squares, n }: { squares: { root: number, square: number }[], n: number }): boolean => {
    if (n < 0 || squares.length == 0) {
        return false;
    }

    return n <= last(squares)!.square;
}

export const build = ({ squares, upTo }: { squares: { root: number, square: number }[], upTo: number }): { root: number, square: number }[] => {
    if (upTo < 0) {
        return [...squares];
    }

    const from = last(squares);

    const toAdd: { root: number, square: number }[] = [];

    for (let root = from ? from.root + 1 : 0; (root * root) <= upTo; root++) {
        toAdd.push({ root, square: (root * root) })
    }

    return [...squares, ...toAdd]
}

export const isKnown = ({ squares, n }: { squares: { root: number, square: number }[], n: number }): boolean => {
    if (squares.length == 0) {
        return false;
    }

    let s = 0;
    let e = squares.length - 1;
    let m = e >> 1;

    if (squares[e].square == n) {
        return true;
    }

    while (e - s > 0) {
        const mid = squares[m].square;
        // console.log({ s, e, m, mid, n })

        if (mid == n) {
            return true;
        }

        if (n < mid) {
            if (e == m) {
                return false;
            }
            e = m;
        } else {
            if (s == m) {
                return false;
            }
            s = m;
        }

        m = ((e - s) >> 1) + s;
    }

    return false;
}

export const isSquare = (() => {
    let squares: { root: number, square: number }[] = [];

    return (n: number): boolean => {
        if (n < 0) {
            return false;
        }

        if (!inKnownRange({ squares, n })) {
            squares = build({ squares, upTo: n })
        }

        return isKnown({ squares, n });
    }
})()