example usage for approvals cli (implemented in ../approvals-cli/verify.py)

# install

```shell
pip install approvaltests
```

# run the test

```shell
jaq -nf fizzbuzz.jq | python ../approvals-cli/verify.py -t test
```
