# Verify cli using Bash

## Background

This is a minimal [Approval-Tests](http://approvaltests.com/) utility for the cli.

BTW, [ChatGPT](https://openai.com/blog/chatgpt/) helped to get things started.

## Usage

Given a command `<test-command>` that produces some output to verify, use the `verify` script like this:

```shell
<test-command> | ./verify -t <test-name> [-d <diff-tool>]
```

If the result of `<test-command>` differs from the approved result, the `<diff-tool>` will be triggered.

### Examples

Simplest form

```shell
echo "hello world!" | ./verify -t hello-world
```

Specify a different diff tool

```shell
echo "hello diff tool" | ./verify -t hello-diff -d "git diff --no-index"
```

## Run the Tests

(yes, `verify` is used to test itself)

```shell
./test | ./verify -t verify-cli-bash
```
