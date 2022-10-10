# install

```shell
pipt install approvaltests
```

# run the test

```shell
python ../approvals-cli/verify.py  -t test -r "$(jaq -nf fizzbuzz.jq)"
```
