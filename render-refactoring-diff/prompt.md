write a python cli program that takes from stdin the result of git diff --word-diff and outputs html


example input:
```shell
hello
one [-too-]{+two+} three
goodbye
```

example output:
```html
<pre style="color: gray">
hello
one <s style="color: red">too </s><b style="color: green">two </b>three.
goodbye
</pre>
```

