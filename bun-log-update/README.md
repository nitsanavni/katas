```shell
time echo aaaaaaaaaaaaaaq | \
    node index.js | \
    jaq -r '.name|({"a":"echo hello","d":"date"}[.]//empty)' | \
    xargs -L 1
node index.js |     jaq -r '.name|({"a":"echo hello","d":"date"}[.]//empty)' |     xargs -L1 -I{} sh -c "{}"
```
