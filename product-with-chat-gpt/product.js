const assert = require("assert");

function product(...arrays) {
    // calculate the cartesian product of the input arrays
    let product = arrays.reduce(
        (acc, array) => {
            return acc.map((x) => array.map((y) => x.concat([y]))).flat();
        },
        [[]]
    );

    // return the result
    return product;
}

// test the function with different input arrays
assert.deepEqual(product([1, 2], [3, 4]), [
    [1, 3],
    [1, 4],
    [2, 3],
    [2, 4],
]);
assert.deepEqual(product([1, 2, 3], [4, 5], [6, 7, 8]), [
    [1, 4, 6],
    [1, 4, 7],
    [1, 4, 8],
    [1, 5, 6],
    [1, 5, 7],
    [1, 5, 8],
    [2, 4, 6],
    [2, 4, 7],
    [2, 4, 8],
    [2, 5, 6],
    [2, 5, 7],
    [2, 5, 8],
    [3, 4, 6],
    [3, 4, 7],
    [3, 4, 8],
    [3, 5, 6],
    [3, 5, 7],
    [3, 5, 8],
]);
assert.deepEqual(product([1], [2], [3], [4], [5]), [[1, 2, 3, 4, 5]]);
