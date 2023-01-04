# jaq shebang

```jq
#!/usr/bin/env -S jaq -nrf

"Hello world!"
```

## test

```shell
./bin.jq | verify.sh -t jaq-shebang
jaq -n 'range(11)|.*.*.*.|tostring' | ./length.jq | verify.sh -t length
```
