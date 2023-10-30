CC=cc 

FILE=makeSum

all: $(FILE)

$(FILE): $(FILE).c
	$(CC) $(FILE).c -o $(FILE)

run: $(FILE)
	./$(FILE)

clean:
	rm -rf $(FILE)

# a test per n: e.g. `make verify n=5`
verify: $(FILE)
	echo ${n} | ./$(FILE) | verify -t make-sum-${n} -d idiff

test: $(FILE)
	seq 3 | rush make verify n={}