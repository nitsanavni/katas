Concept for ApprovalTests - trigger a `verify` call from the cli.

See discussion [here](https://github.com/approvals/ApprovalTests.Python/issues/127).

# installs

```shell
pip install approvaltests
```

# example usage

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
