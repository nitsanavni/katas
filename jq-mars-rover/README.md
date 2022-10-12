[mars rover kata](https://sammancoaching.org/kata_descriptions/mars_rover.html) in [jaq](https://github.com/01mf02/jaq), using [approvals](http://approvaltests.com/)

# Why

This is showing a polyglot approach to practicing jq, TDD, approvals.

It also shows the potential of triggering `approvals.verify` via the cli. See related discussion [here](https://github.com/approvals/ApprovalTests.Python/issues/127).

# What

The tests are written in js, the mars-rover is implemented in jq, and the testing style is using approvals by triggering python approvals via the cli form the js test code.

# Installs

```shell
pip install approvaltests
cargo install jaq
npm i
```

# Run the Tests

```shell
npx ava
```
