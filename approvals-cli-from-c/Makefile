do-test: test
	./test

test: test.o verify.o fizzbuzz.o
	c++ test.o verify.o fizzbuzz.o -o test

verify.o: verify.c
	cc -c verify.c

fizzbuzz.o: fizzbuzz.c
	cc -c fizzbuzz.c

test.o: test.cpp doctest.h
	c++ -c test.cpp

doctest.h:
	ls doctest.h 1> /dev/null || curl -o doctest.h https://raw.githubusercontent.com/doctest/doctest/master/doctest/doctest.h