test: test.o
	./test.o

test-watch: test.o entr
	ls *.[hc]* | entr -c ./test.o

entr:
	brew install entr
	touch entr

test.o: catch.o mars_rover.o test.cpp
	c++ -o test.o test.cpp mars_rover.o catch.o

catch_src = catch_amalgamated.cpp catch_amalgamated.hpp

catch.o: $(catch_src)
	c++ -c catch_amalgamated.cpp -o catch.o

$(catch_src):
	curl -L -o $@ https://github.com/catchorg/Catch2/releases/download/v3.1.0/$@

mars_rover.o: mars_rover.c mars_rover.h
	cc -c mars_rover.c
