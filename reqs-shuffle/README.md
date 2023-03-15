# The Requirements Shuffle Kata

Practice changing requirements.

# How

Given a bank of potential requirement segments (bank), when we call `./shuffle.ts -b bank -r requirements` the requirements are updated with new ones.

-   Requirements segments may be vague, small, and even contradicting
-   New requirements are always more important than older requirements (and more urgent of course)
-   Although, our legacy should be maintained
-   Keep it simple

# Example - FizzBuzz

FizzBuzz requirements bank - [fizzbuzz.bank](./fizzbuzz.bank)

```shell
./shuffle.ts -r fizzbuzz.reqs -b fizzbuzz.bank
```

## Reminder to Shuffle in 5 min

```shell
sleep 5m && ./shuffle.ts -r fizzbuzz.reqs -b fizzbuzz.bank && code fizzbuzz.reqs &
```
