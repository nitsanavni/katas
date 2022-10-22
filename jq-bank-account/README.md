## deposit

```sh
jaq -if bank-account.jq --arg args "[\"deposit\",500,\"$(date)\"]" account.json
```

## print statement

```sh
jaq -rf bank-account.jq --arg args "[\"print_statement\"]" account.json
```
