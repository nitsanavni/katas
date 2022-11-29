# Cartesian Product in jq

## example

```
$ ./product.sh '[["a","b","c"], [0,1], [0,1]]'
["a",0,0]
["a",0,1]
["a",1,0]
["a",1,1]
["b",0,0]
["b",0,1]
["b",1,0]
["b",1,1]
["c",0,0]
["c",0,1]
["c",1,0]
["c",1,1]
```

## run tests

```
ls product* | entr -c ./test.sh
```
