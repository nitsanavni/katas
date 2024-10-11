@./test.sh
@./word_diff_to_model.py


+ ./test.sh
Traceback (most recent call last):
  File "/Users/nitsanavni/code/katas/render-refactoring-diff/./word_diff_to_model.py", line 55, in <module>
    main()
  File "/Users/nitsanavni/code/katas/render-refactoring-diff/./word_diff_to_model.py", line 50, in main
    yaml_output = convert_diff_to_yaml(diff_input)
                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/Users/nitsanavni/code/katas/render-refactoring-diff/./word_diff_to_model.py", line 30, in convert_diff_to_yaml
    next_change = min(
                  ^^^^
ValueError: min() arg is an empty sequence
