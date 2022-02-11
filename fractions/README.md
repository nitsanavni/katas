dev:

```
$ cd fractions
$ npx tsc -w &
$ docker run -it --rm -d -p 8080:80 --name coverage -v $PWD/coverage:/usr/share/nginx/html:ro nginx
$ ls test.js | entr parallel --tty -j+0 ::: "npx c8 --all -x '.eslintrc.js' -x coverage -r html -r text ava" "npx eslint ."
```
