CC=cc 

FILE=makeSum

all: $(FILE)

$(FILE): $(FILE).c
	$(CC) $(FILE).c -o $(FILE)

run: $(FILE)
	./$(FILE)

clean:
	rm -rf $(FILE)

# an approval test per n: e.g. `make verify n=5`
# the `grep -v` and `perl` cmds are scrubbers
verify: $(FILE)
	echo ${n} | \
	./$(FILE) | \
        perl -pe 's/\-?\d{4,}/\\d/g' | \
	grep -v "Enter a number: " | \
	verify -t make-sum-${n} -d idiff

test: $(FILE)
	seq -1 4 | rush -- make -s verify n={}
	make verify -s n="non-integer"
