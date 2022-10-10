[Approvals](https://approvaltests.com/) attempt at [fizzbuzz](https://sammancoaching.org/kata_descriptions/fizzbuzz.html) with [jaq](https://github.com/01mf02/jaq).

## Background

This is an exercise (3rd attempt) on the path to learn jq / jaq, including testing.

Previous attempts at this:
- https://github.com/nitsanavni/katas/tree/main/fizzbuzz-jaq
- https://github.com/nitsanavni/katas/tree/main/fizzbuzz-jaq-tdd

## Setup

- approvals by [python approvaltests](https://github.com/approvals/ApprovalTests.Python)
- test execution by [pytest](https://docs.pytest.org/en/7.1.x/)
- test code in `test-fizzbuzz.py`
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
