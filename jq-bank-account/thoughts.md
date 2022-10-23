- I think there's a race condition when we combine `jaq --in-place` with:

```jq
def a: "a";
def b: "b";
{
    a: a,
    b: b
}["a"]
```

or maybe it's with combination with `reduce`...?
