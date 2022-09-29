test: test.a tap
	./test.a --reporter=TAP | tap - --reporter=terse

all: test.a

test-watch: entr
	ls *.[hc]* | entr -c make -s

clean:
	git clean -dfx

entr:
	which entr || brew install entr

tap:
	which tap &> /dev/null || npm i -g tap

test.a: test.o catch.o mars_rover.o
	c++ -std=c++14 -o $@ $^

test.o: test.cpp catch_amalgamated.hpp
	c++ -std=c++14 -c test.cpp -o $@

catch_src = catch_amalgamated.cpp catch_amalgamated.hpp

catch.o: $(catch_src)
	c++ -std=c++14 -c catch_amalgamated.cpp -o $@

$(catch_src):
	curl -L -o $@ https://github.com/catchorg/Catch2/releases/download/v3.1.0/$@

mars_rover.o: mars_rover.c mars_rover.h
	cc -c mars_rover.c
