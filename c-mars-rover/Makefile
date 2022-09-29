test: test.o
	./test.o

test-watch: entr
	ls *.[hc]* | entr -c make -s

clean:
	git clean -dfx

entr:
	brew install entr
	touch entr

test.o: catch.o mars_rover.o test.cpp
	c++ -std=c++14 -o $@ $^

catch_src = catch_amalgamated.cpp catch_amalgamated.hpp

catch.o: $(catch_src)
	c++ -std=c++14 -c catch_amalgamated.cpp -o $@

$(catch_src):
	curl -L -o $@ https://github.com/catchorg/Catch2/releases/download/v3.1.0/$@

mars_rover.o: mars_rover.c mars_rover.h
	cc -c mars_rover.c
