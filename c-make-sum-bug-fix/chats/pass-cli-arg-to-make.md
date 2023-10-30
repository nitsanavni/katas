# user

I have a C program that I run using `make run`, it expects user input in the form of an integer, is there a way to pass it from cli without typing it?


# assistant

Yes, you can pass the input to the program using a pipeline, `echo`, or redirection operators. 

For example, if your program expects one integer, you can pass it as follows:

```bash
echo 123 | make run
```

Or:
```bash
make run <<< "123"
```

This will pass `123` to the standard input of your program.


Moreover, if your program expects multiple inputs, you can write them all separated by a space in the `echo` command or inside the `<<<` operator.

```bash
echo -e "123\n456" | make run
```

Or:
```bash
make run <<< $'123\n456'
```

In these examples, the program will first receive the input `123`, then `456`.
   
Remember, this will only work if your `Makefile` has been set up to read from standard input when the `run` command is invoked. Specifically, `run` must invoke the executable that your `Makefile` generates without redirecting its input elsewhere. If `run` does redirect input, you may need to modify the `Makefile`.


