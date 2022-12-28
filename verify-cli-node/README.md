```shell
npx tsc -w &
```

```shell
ls verify*js | entr -c node verify-cli-test.js
```

```shell
ls scrub*js | entr -c sh -c 'node scrub-test.js | node verify.js scrub-test'
```
