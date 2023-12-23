cli process approvals

# usage

```shell
./verify -t test_name -d diff_tool -- test_cmd
```

## example

```shell
$ ./verify -t fizzbuzz -- jq -nrf fizzbuzz.jq
✅ Test Passed

$ cat fizzbuzz.jq
def fizzbuzz:
    if . % 15 == 0 then "FizzBuzz"
    elif . % 5 == 0 then "Buzz"
    elif . % 3 == 0 then "Fizz"
    else . end;

range(100) + 1 | fizzbuzz

$ head fizzbuzz.approved; echo "..."; tail fizzbuzz.approved 
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

$ ./verify -t fizzbuzz -- ./fizzbuzz.sh 
✅ Test Passed

$ cat fizzbuzz.sh 
#!/bin/bash

for i in {1..100}; do
    output=""
    if [ $((i % 3)) -eq 0 ]; then
        output+="Fizz"
    fi
    if [ $((i % 5)) -eq 0 ]; then
        output+="Buzz"
    fi
    if [ -z "$output" ]; then
        output=$i
    fi
    echo $output
done

$ ./verify -t fizzbuzz -- ./fizzbuzz.py
✅ Test Passed

$ cat fizzbuzz.py 
#!/usr/bin/env python

for i in range(1, 101):
    output = ""
    if i % 3 == 0:
        output += "Fizz"
    if i % 5 == 0:
        output += "Buzz"
    if output == "":
        output = i
    print(output)
```
