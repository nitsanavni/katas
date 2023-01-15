## flow

-   multiple `verify` calls in a single test file
-   each call to `verify` just prints the result to stdout with a known **prefix**
-   a script `inline.sh` is then used to zip the test code with the results
-   the inlined text is written back to the test source file
-   approve: at this point we approve the results - commit / stage the changes
-   and from now on, running the test simply means re-running `inline` and then `git diff`.

## example with typescript

start with:

```ts
verify("hello 1");
/* verify
verify */
```

stdout is:

```
--- verify result 1 ---
hello 1
```

after inline:

```ts
verify("hello 1");
/* verify
hello 1
verify */
```

## with two calls to `verify`

start with:

```ts
verify("hello 1");
/* verify
verify */

verify(`a
b
c`);
/* verify
verify */
```

stdout is:

```
--- verify result 1 ---
hello 1
--- verify result 2 ---
a
b
c
```

after inline:

```ts
verify("hello 1");
/* verify
hello 1
verify */

verify(`a
b
c`);
/* verify
a
b
c
verify */
```
