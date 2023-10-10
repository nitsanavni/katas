- ask chat for a kata idea
- convert json chat conversations into markdown
- but... how do I test this? I'd need examples, positive and negative
  - we could generate examples
  - we could have sub-validators, each focusing on a different aspect of the puzzle. e.g. `validate(puzzle, { row: 3 })`, `validate(puzzle, { 3x3grid: { row: 0, column: 2 } })` - and it would be easy to provide positive and negative examples for these
  - maybe property-based testing for the full puzzles?

```shell
$ jq -n '[1,3,2]|sort==[1,2,3]'
true
```

```shell
$ seq -s" " 9
1 2 3 4 5 6 7 8 9
```

```shell
$ jq -rn '[range(9)+1]|join(" ")'
1 2 3 4 5 6 7 8 9
```

a matrix where each row is 1-9, but w different offsets: 1,4,7,2,5,8,3,6,9

I think that's a valid sudoku

```shell
for ((i=1; i<=9; i++)); do seq -s" " 9; done | jq -sR 'split("\n")|map(select(.!=""))'
```

