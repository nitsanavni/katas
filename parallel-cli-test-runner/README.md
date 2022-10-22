# installs

```sh
pip install approvaltests
cargo install jaq
brew install parallel
```

# run tests

```bash
< tests.json jaq -rf command.jq | parallel
```

# run tests continuously

```sh
ls tests.json mars-rover.jq | entr -c sh -c "< tests.json jaq -rf command.jq | parallel"
```

# idea

break the code into two

```sh
echo "0 0 N" | jaq -Rf follow-instruction.jq --arg instruction R
```
