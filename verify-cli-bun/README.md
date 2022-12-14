# verify cli implemented with bun

run the tests (with the `verify` bash script)

```shell
./verify-cli-test.ts | ./verify verify-cli-test
```

or

```shell
./test
```

continuously

```shell
ls verify-cli-test.ts verify-cli-test.approved verify.ts | entr -c ./test
```

or

```shell
./test-watch
```
