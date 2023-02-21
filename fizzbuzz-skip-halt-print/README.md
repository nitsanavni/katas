# inspiration

https://themonadreader.files.wordpress.com/2014/04/fizzbuzz.pdf

# installs

```shell
bun upgrade
bun install
```

# test

## update snapshots

```shell
bun run index.ts > result
```

or

```shell
./update.sh
```

## test

```shell
date +%R:%S; bun run index.ts | diff -s - result
```

or

```shell
./test.sh
```

## watch

```shell
ls index.ts | entr -c ./test.sh
```

## tdd

```shell
ls index.ts result | entr -cs './test.sh || (bun run index.ts > received; code --diff received result)'
```
