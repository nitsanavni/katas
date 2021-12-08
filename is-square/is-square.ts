const squares: { root: number, square: number }[] = [];

const last = <T>(arr: T[]): T => arr[arr.length - 1];

const inKnownRange = (n: number): boolean => {
    if (n < 0 || squares.length == 0) {
        return false;
    }

    return n <= last(squares).square;
}

const isKnown = (n: number): boolean => {
    if (squares.length == 0) {
        return false;
    }

    let s = 0;
    let e = squares.length - 1;
    let m = e >> 1;

    while (e - s > 0) {
        const mid = squares[m].square;

        if (mid == n) {
            return true;
        }

        if (mid < n) {
            e = m;
        } else {
            s = m;
        }

        m = ((e - s) >> 1) + s;
    }

    return false;
}

export const isSquare = (n: number): boolean => {
    if (n < 0) {
        return false;
    }

    if (inKnownRange(n)) {
        return isKnown(n);
    }

    return true;
}