@./mutation_test.py

only print surviving mutations once
currently I see it twice in the output

looks like this:
python3 mutation_test.py --mutate_file gilded_rose.py --test_cmd 'diff <(python3 test_gilded_rose.py) test_gilded_rose.py.approved'
Surviving mutation: Replace '0' with '0' on line 11
Surviving mutation: Replace '1' with '0' on line 13
Surviving mutation: Replace '0' with '0' on line 29
Surviving mutation: Replace '1' with '0' on line 31
Total surviving mutations: 4
Surviving mutation details: Line 11, Pattern '0', Replacement '0'
Surviving mutation details: Line 13, Pattern '1', Replacement '0'
Surviving mutation details: Line 29, Pattern '0', Replacement '0'
Surviving mutation details: Line 31, Pattern '1', Replacement '0'
