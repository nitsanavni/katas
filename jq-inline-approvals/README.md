# inline approvals with jq

results in watch mode

```shell
ls test.jq | entr -cs './test.sh ; sleep .2'
```

approvals in watch mode

```shell
ls test.jq | entr -cs 'sleep 0.3; timeout --foreground 8 git add -p test.jq; echo waiting'
```
