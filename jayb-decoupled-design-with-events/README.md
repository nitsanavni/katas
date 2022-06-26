# Context

Inspired by https://jay.bazuzi.com/Decoupled-Design/

# What's Here?

1. Port Jay's examples to Typescript
2. Add one more variation - use [Rx](https://reactivex.io/intro.html) for eventing

   this allows using the 'channel' (I've used a simple [`Subject`](https://reactivex.io/documentation/subject.html)) itself, both for manipulating the design and for testing

# Run

## Prerequisites

Node 16

Can use [`nvm`](https://github.com/nvm-sh/nvm) -

```sh
$ nvm install 16
```

## Install Deps

```sh
$ npm ci
```

## Run the Tests

```sh
$ npx ava
```
