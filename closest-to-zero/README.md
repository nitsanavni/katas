taken from https://sammancoaching.org/kata_descriptions/closest_to_zero.html

I run it like this:

```sh
$ npx tsc -w &
$ brew install entr
$ find . -maxdepth 1 -name '*test.js' | entr npx ava
```
