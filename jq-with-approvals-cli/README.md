example usage for approvals cli (implemented in ../approvals-cli/verify.py)

# install

```shell
pipt install approvaltests
```

# run the test

```shell
python ../approvals-cli/verify.py  -t test -r "$(jaq -nf fizzbuzz.jq)"
```
