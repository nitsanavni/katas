# typescript product function

The Cartesian product between multiple arrays.

## examples

```ts
product([1, 2, 3], ["a", "b"]) ==
    [
        [1, "a"],
        [1, "b"],
        [2, "a"],
        [2, "b"],
        [3, "a"],
        [3, "b"],
    ];

product([0, 1], [0, 1], [0, 1], [0, 1]) ==
    [
        [0, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 1, 0],
        [0, 0, 1, 1],
        [0, 1, 0, 0],
        [0, 1, 0, 1],
        [0, 1, 1, 0],
        [0, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 0, 0, 1],
        [1, 0, 1, 0],
        [1, 0, 1, 1],
        [1, 1, 0, 0],
        [1, 1, 0, 1],
        [1, 1, 1, 0],
        [1, 1, 1, 1],
    ];
```

## run the tests

### install bun

instructions here: https://bun.sh/

### run the tests

```shell
bun wiptest
```
