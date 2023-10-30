CC=cc 

FILE=makeSum

all: $(FILE)

$(FILE): $(FILE).c
	$(CC) $(FILE).c -o $(FILE)

run: 
	./$(FILE)

clean:
	rm -rf $(FILE)

# a test per n: e.g. `make verify n=5`
verify:
	echo ${n} | ./$(FILE) | verify -t make-sum-${n} -d idiff

test:
	seq 3 | rush make verify n={}