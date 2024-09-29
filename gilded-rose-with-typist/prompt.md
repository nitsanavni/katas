@./gilded_rose.py

let's write a new script mutations.py

we'll call it like this:
python3 mutations.py <file>

it will print out potential mutations for the file
one mutation per line
each line of output shows
1. the line number in the <file> 
2. and the mutation to apply as a tuple (search pattern, replacement str)

let's start with one type of mutation: if the line contains an integer, we'll replace it with 0
