# Mars Rover in C

## Background

see https://sammancoaching.org/kata_descriptions/mars_rover.html

## Run

### Get and build Catch2 (needed before tests can run)

```shell
./get-catch2.sh
```

### Build and run tests

```shell
./test.sh
```

### Build and test continuously

First:

```shell
brew install entr
```

Then:

```shell
ls *.[hc]* | entr -c ./test.sh
```
