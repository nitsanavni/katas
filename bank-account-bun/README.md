# Bank account with Bun

[Bank Account Kata Description](https://sammancoaching.org/kata_descriptions/bank_account.html)  
[Bun](https://bun.sh/)

# Test

```shell
bun test.ts bank-account.test.ts
```

# Thoughts

-   challenges
    -   `printStatement` logs to stdout (by definition) - implicit output
        -   integration test - child process stdout
        -   unit tests - internal method `formatStatement`
    -   dates in the statement - implicit input
    -   approvals + dates: need scrubber / stubs
    -   creating a string table
        -   determine columns width, then print table
-   nice pattern - wrapping `bun:test` with our own `approvals:test`
-   if we have a cli wrapper, and we process every command at a time (every command is a new process), then we need extra persistence of the account state
-   using approvals with dates in the statement :/
    -   scrubber?
    -   inject / mock / spy?
        -   https://jay.bazuzi.com/Mocks-OK/
