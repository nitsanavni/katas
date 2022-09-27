# mars-rover-2

Get prerequisites:

```shell
curl https://bun.sh/install | bash
brew install entr
```

Install dependencies:

```shell
bun install
```

Test:

```shell
bun wiptest
```

Test Continuously:

```shell
ls *.spec.ts | entr -c bun wiptest
```
