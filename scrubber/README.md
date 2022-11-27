# a simple scrubber in typescript

## background

A [scrubber](https://approvaltestscpp.readthedocs.io/en/latest/generated_docs/explanations/Scrubbers.html) is a useful tool to normalize text, for example when using [approval tests](http://approvaltests.com/).

## run the tests

### install bun

follow instructions here: https://bun.sh/

### run the tests

```
ls scrubber.* | entr -c bun wiptest
```
