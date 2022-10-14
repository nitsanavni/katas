Concept for ApprovalTests - trigger a `verify` call from the cli.

See discussion [here](https://github.com/approvals/ApprovalTests.Python/issues/127).

# installs

```shell
pip install approvaltests
```

# usage

```shell
python verify.py --test-id hello --received "hello world!"
```

or

```shell
python verify.py -t hello -r "hello world!"
```

or

```shell
echo "hello world!" | python verify.py -t hello
```

# examples

- [with bun](https://github.com/nitsanavni/katas/tree/main/bun-verify)
- [with node.js](https://github.com/nitsanavni/katas/tree/main/approvals-cli-from-ts)
- [with jq/jaq](https://github.com/nitsanavni/katas/tree/main/jq-with-approvals-cli)
- [test in js, code in jq](https://github.com/nitsanavni/katas/tree/main/jq-mars-rover)
