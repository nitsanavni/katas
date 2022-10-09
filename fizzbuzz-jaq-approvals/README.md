Approvals attempt at fizzbuzz with jaq

## Setup

- approvals are run using python approvaltests
- test is executed by pytest
- jaq is invoked as a chid process via the Command pkg
- the test code is in `test-fizzbuzz.py`
- the dut is in `fizzbuzz.jq`

## installs

```shell
pip install pytest approvaltests Command
cargo install jaq
```

## run the test

```shell
python -m pytest test-fizzbuzz.py
```
