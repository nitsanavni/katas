# C mars rover

## get and build Catch2 (needed before tests can run)

```shell
./get-catch2.sh
```

## build and run tests

## build and test continuously

first:

```shell
brew install entr
```

then:

```shell
ls *.[hc]* | entr -c ./test.sh
```
