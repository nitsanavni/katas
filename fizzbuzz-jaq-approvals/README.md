Approvals attempt at fizzbuzz with jaq

## Setup

- approvals by python approvaltests
- test execution by pytest
- jaq is invoked as a chid process via the Command pkg
- the test code is in `test-fizzbuzz.py`
- the dut is in `fizzbuzz.jq`

## Installs

### Python Reqs

```shell
pip install pytest approvaltests
cargo install jaq
```

### Other Installs

```
brew install entr
cargo install jaq
```

## Run the Test

```shell
python -m pytest test-fizzbuzz.py
```

## Continuously Run the Test While Coding

```shell
ls fizzbuzz.jq test-fizzbuzz.py | entr -c python -m pytest test-fizzbuzz.py
```
