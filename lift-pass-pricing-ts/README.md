# Lift Pass Pricing Refactoring Kata

https://github.com/martinsson/Refactoring-Kata-Lift-Pass-Pricing

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
rm *.js
bun run logic-driver.ts > logic-result
bunx stryker run
```

`test-logic.sh` takes 0.27s to execute (8s for mutation tests)

with the e2e it took for the same coverage 1.7s

after stubbing the data layer - 0.12s
