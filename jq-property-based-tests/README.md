# property based testing jq code

## Background

This shows how to test jq code with a property-based testing framework (fast-check).

We invoke the jq code from typescript as a child process with `Bun.spawn`.

We test-drive it using inputs generated in typescript with fast-check.

Finally we inspect the result of each invocation with a simple regex.

## Run

Install dependencies

```bash
bun install --backend=copyfile
```

Run tests

```bash
bun wiptest
```
