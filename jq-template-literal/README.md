# jq template literal

invoke jq from javascript with:

```ts
const square = jq`. * .`;

expect(await square(8)).toEqual(64);
```

## Run

installs

[jaq](https://github.com/01mf02/jaq), [bun](https://bun.sh/)

```
bun install --backend=copyfile
```

run tests

```
bun wiptest
```
