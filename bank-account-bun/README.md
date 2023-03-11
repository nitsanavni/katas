# Bank account with Bun

[Bank Account Kata Description](https://sammancoaching.org/kata_descriptions/bank_account.html)  
[Bun](https://bun.sh/)

# Test

```shell
bun test
```

# Thoughts

-   learned - it's much cleaner to approval test a date formatter
    -   could have `expect(format("2012-03-14")).toEqual("2012-03-14")` - maybe even cleaner
-   ✅ idea - in `approvals:test` could simply return the received string, iso calling `verify`
-   workflow
    -   TDD
    -   small steps
-   design
    -   strong types
    -   primitives e.g. `movements = []`
    -   try to make functions as **pure** as possible (including not accessing class fields)
        -   `table(arr, headers)` -> `table(headers)(arr)`
        -   `calcBalance()` -> `calcBalance(movements)`
    -   compose with `pipe`
    -   initialize with static structure
        -   have an explicit initializer
        -   assembles and combines small components
    -   testability
        -   challenges: implicit inputs (date) and outputs (stdout)
        -   avoid mocking own interfaces
    -   speak the domain
-   challenges
    -   `printStatement` logs to stdout (by definition) - implicit output
        -   integration test - child process stdout
        -   unit tests - internal method `formatStatement` / internal class `core`
    -   dates in the statement - implicit input
    -   approvals + dates: need scrubber / stubs
    -   creating a string table
        -   determine columns width, then print table
-   nice pattern - wrapping `bun:test` with our own `approvals:test`
    -   using `describe` helps bun in finding all the tests
-   if we have a cli wrapper, and we process every command at a time (every command is a new process), then we need extra persistence of the account state
-   using approvals with dates in the statement :/
    -   scrubber?
    -   inject / mock / spy?
        -   https://jay.bazuzi.com/Mocks-OK/
