installs, and init db

```shell
bun upgrade
bun install
./start-db.sh
```

build up coverage for `test-e2e.sh`

```shell
bunx tsc
./e2e.sh > e2e-result
bunx stryker run -c 1
```

extract `logic`

```shell
bunx tsc -w &
ls prices.js | entr -c ./test-e2e.sh
```

build up coverage for `test-logic.sh`

```shell
bun run logic-driver.ts > logic-result
rm logic.js
bunx stryker run
```
