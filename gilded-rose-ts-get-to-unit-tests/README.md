plan

-   cover
-   refactor and add unit-tests - provable documentation
-   `if (quality > 50)` can lift-up-conditional too

# starting position

```shell
bun upgrade
bun install
```

# cover

```shell
ls test.ts | entr -c ./cover.sh
```

# refactor

refactor only - safety net

```shell
ls gilded-rose.ts | entr -c ./test.sh
```

build-up unit tests

-   continuous safety net from original coverage test

    -   can run in bg

    ```shell
    ls gilded-rose.ts | entr -n ./test.sh &
    ```

-   approvals workflow for new unit tests - with diff tool
    -   should probably be in a separate file

```shell
ls unit-tests.ts unit-tests-approved gilded-rose.ts | entr ./unit-tests.sh
```

# Learnings

-   getting to full coverage - can be accelerated with a file watching aided workflow
