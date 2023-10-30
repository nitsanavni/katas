# user

write a Makefile for a single C file, use cc, filename is makeSum.c, it should clean, compile, run


# assistant

The Makefile would look something like this:

```Makefile
# Declaring the compiler
CC=cc 

# File name
FILE=makeSum

all: $(FILE)

$(FILE): $(FILE).c
	$(CC) $(FILE).c -o $(FILE)

run: 
	./$(FILE)

clean:
	rm -rf $(FILE)
```

Here's how you would use the Makefile:

- To compile, simply type `make`.

- To run the program after compiling, type `make run`.

- To clean up (remove) the executable, type `make clean`.


