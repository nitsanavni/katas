@./mutate.py
@./test_mutate.py
@./test_mutate.py.approved
@./generate_mutations.py
@./test_generate_mutations.py
@./test_generate_mutations.py.approved

don't modify any of these files
we're adding a new file:
mutation_test.py

used like this:
python3 mutation_test.py --mutate_file ... --test_cmd ...

first runs the test_cmd to make sure it passes before mutating the mutate_file
saves a copy of the original mutate_file
generate mutations for the mutate_file
for each mutation:
  mutate the mutate_file by writing the result of mutate.py to the mutate_file
  run the test_cmd
  if the test_cmd fails, print the mutation that caused the failure
  if passes, do nothing
  restore the original mutate_file after each mutation
