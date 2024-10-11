please write the script `word_diff.py` that takes two files as arguments and outputs the word diff between them.
script output should be printed to stdout.
use difflib

you need to implement the diff algorithm.
do it line by line.


output is a yml doc
consists of a list of lines
a line is a string, or if there are diffs it's a list of parts
a part is a string (unchanged parts), or a dict with one of the following keys: `a` for added, `d` for deleted


example output

@./diff.yml

again - the script is not outputting files, just write to stdout
