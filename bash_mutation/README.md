mutation testing for the gilded_rose.sh bash script

# Workflow

- we aim for good test coverage before we can start refactoring
- we use approval tests + combination approvals
  - for **approvals** we use the [`diff` command with a single approved file](./test.sh):
```shell
echo "$input" | bash gilded_rose.sh | diff - approved
```
  - for **combinations** we use `jq`'s `combinations`
```shell
input=$(jq -rn '[
    ["Some Item", "Aged Brie", "Sulfuras, Hand of Ragnaros"],
    [0,1],
    [0,1,50]
]|combinations|join("|")')
```
- we use mutation testing to find wholes in our test - see [mutate.sh](./mutate.sh)
  - mutating the script is done with `sed` commands (suggested by ChatGPT in a separate session)
  - identifying mutations is usually done using an automatic tool - we currently do this part manually
  - executing the mutations and reporting their survival is automated