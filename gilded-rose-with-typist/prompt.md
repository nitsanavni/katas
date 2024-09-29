@./mutation_test.py

1. don't print test output, supress it
2. it's the opposite: after mutation test_cmd is expected to fail, so we only wnat to know about surviving mutants, those mutations that the test_cmd still passes
