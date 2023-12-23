cli process approvals

# usage

```shell
./verify -t test_name -d diff_tool -- test_cmd
```

## example

```shell
$ ./verify -t fizzbuzz.jq -- jq -nrf fizzbuzz.jq
✅ Test Passed

$ cat fizzbuzz.jq
def fizzbuzz:
    if . % 15 == 0 then "FizzBuzz"
    elif . % 5 == 0 then "Buzz"
    elif . % 3 == 0 then "Fizz"
    else . end;

range(100) + 1 | fizzbuzz

$ head fizzbuzz.jq.approved; echo "..."; tail fizzbuzz.jq.approved 
Test Name: fizzbuzz.jq
---
Exit Code: 0
---
STDOUT:
1
2
Fizz
4
Buzz
...
Fizz
94
Buzz
Fizz
97
98
Fizz
Buzz
---
STDERR:
```
