Concept - approvals using the git staging area

# Explain

Instead of two files: 1. 'received' and 2. 'approved', we now have a single file 'result' living in the two git areas: 1. the 'working tree' and 2. the 'index'.

The working tree version acts like the received file.

The index version acts like the approved file.

# See it in Action

[![Demo of The Concept with FizzBuzz](https://img.youtube.com/vi/MxW64uxPZmM/0.jpg)](https://youtu.be/MxW64uxPZmM)

# Use it

```shell
./verify.sh ./test
```

in watch mode

```
ls fizzbuzz.jq | entr -c ./verify.sh ./test
```
