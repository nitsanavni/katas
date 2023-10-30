# user

how to pass an arg to a make target?


# assistant

GNU Make language has no built-in feature to pass arguments to a Target, however it can be achieved by using an auxiliary variable on the command line. Here's an example of how you could do that:

```makefile
target:
    @echo arg=$(arg)

```

You could then call your target with something like:

```bash
make target arg=your_argument
```

In the given example, Make will echo whatever value you pass to `arg`. Note that this is not strictly passing an argument to a target, but it's a common way to achieve similar functionality. Also note that such variables are global and can affect other rules, so if you have a large make system use this idiom with care.


