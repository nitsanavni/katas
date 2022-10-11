trigger a `verify` call from the cli

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
