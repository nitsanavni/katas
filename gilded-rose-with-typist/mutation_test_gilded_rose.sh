./mutate_and_test.sh --mutate_file gilded_rose.py --test_cmd 'diff <(python3 test_gilded_rose.py) test_gilded_rose.py.approved > /dev/null'
