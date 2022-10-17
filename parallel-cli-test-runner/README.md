# installs

```sh
pip install approvaltests
cargo install jaq
brew install parallel
```

# run tests

```sh
< tests.json jaq -rf command.jq | parallel
```

# idea

break the code into two

```sh
echo "0 0 N" | jaq -Rf follow-instruction.jq --arg instruction R
```
