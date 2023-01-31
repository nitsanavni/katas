# inline approvals with jq

Two styles of the same exercise:

## using the git staging area

results in watch mode

```shell
ls test.jq | entr -cs './test.sh ; sleep .2'
```

approvals in watch mode with git staging (no received file)

```shell
ls test.jq | entr -cs 'sleep 0.3; timeout --foreground 8 git add -p test.jq; echo waiting'
```

## using a received file

approvals in watch mode with received file

```shell
ls test.jq | entr -cs './inline.py test.jq > received'
```

then, it's useful to have the side-by-side diff open while working:

```shell
code --diff received test.jq
```
