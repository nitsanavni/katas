# user

make cmd silence the make steps themselves but not their output


# assistant

You can use `-s` or `--silent` or `--quiet` options with `make` command to silence the make steps themselves but not their output. Here's an example:

```bash
make -s target
```
or
```bash
make --silent target
```
or
```bash
make --quiet target
``` 

Replace `target` with your actual target in your makefile.

These options instruct `make` to not print the recipes (commands) before they are executed. However, it will still show you the output of each recipe (command).

If a command itself is generating output you don't want to see, you should fix this in the makefile by redirecting its output to the null device, `/dev/null`, or by making the command be silent.


