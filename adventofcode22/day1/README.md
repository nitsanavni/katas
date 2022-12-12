didn't work

```sh
curl https://adventofcode.com/2022/day/1/input -o input
```

solve for input

```
jaq -sRf <(cat highest-elf-calory-count.jq; echo 'split("\n")|highest_calories') day-1-input.txt
```

part 2

```
jaq -sRf <(cat highest-elf-calory-count.jq; echo 'split("\n")|top_three') day-1-input.txt
```

dev

```
./dev
```
