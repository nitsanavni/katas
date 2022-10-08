# thoughts

- how to structure tests?
  - idea: shell piping `input | jq -f dut | assert`
    e.g.: `echo 3 | jaq -f fizzbuzz | jaq '. == "fizz"'`
  - idea: jaq piping `jaq -n 'input | dut | assert'`
    e.g.: `jaq -n '3 | fizzbuzz | . == "fizz"'`
    or rather: `jaq -n '3 | if . % 3 == 0 then "fizz" elif . % 5 == 0 then "buzz" else . end | . == "fizz"'`
    or: `jaq -n 'def input: 3; def output: "fizz"; input | if . % 3 == 0 then "fizz" elif . % 5 == 0 then "buzz" else . end | . == output'`
    or:
    ```shell
    jaq -n '
    def fizzbuzz: if . % 3 == 0 then "fizz" elif . % 5 == 0 then "buzz" else . end;
    def input: 3;
    def assert: . == "fizz";
    def test: input | fizzbuzz | assert;
    test
    '
    ```
