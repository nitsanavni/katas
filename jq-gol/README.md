https://codingdojo.org/kata/GameOfLife/

# run all tests

```shell
./test-all
```

# behold the magic of life

```bash
watch -n .5 'tmp=$(mktemp) && <frame.json jaq --arg method gol -f gol.jq >$tmp && mv $tmp frame.json && jaq <frame.json'
```
