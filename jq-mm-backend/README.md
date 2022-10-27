backend for a mindmap written in jq

# design

## the data model

The model is a json array, representing an outline:

```json
[
  {
    "text": "0: outline root",
    "indent": 0,
    "select": true
  },
  {
    "text": "1: 1st child of root",
    "indent": 1,
    "fold": true
  },
  {
    "text": "2: 2nd child of root",
    "indent": 1
  },
  {
    "text": "3: 1st child of 2",
    "indent": 2
  },
  {
    "text": "4: 2nd child of 2",
    "indent": 2
  },
  {
    "text": "5: 3rd child of root",
    "indent": 1
  }
]
```

## Outline Render

Rendering this model as an outline, gives:

```sh
$ jaq -rf outline.jq model.json
- 0: outline root
  - 1: 1st child of root
  - 2: 2nd child of root
    - 3: 1st child of 2
    - 4: 2nd child of 2
  - 5: 3rd child of root
```

## Render as Mind Map

### Run the Tests

```sh
jaq -rf mindmap-render-test-command.jq mindmap-render-test.json | parallel -j 5
```

### Thoughts

```json
[
  { "t": "a", "i": 0 },
  { "t": "b", "i": 1 },
  { "t": "c", "i": 1 },
  { "t": "d", "i": 1 }
]
```

-->

```json
[
  { "t": ["a"], "i": 0 },
  { "t": ["b", "c", "d"], "i": 1 }
]
```

-->

```json
[{ "t": [" b", "ac", " d"], "i": 0 }]
```

- it's like the dependencies!
  - when a node is resolved it no longer needs its children and it's ready to be added to its parent until it's resolved in turn
  - also once it's resolved it knows its own size (height)
  - leafs are already resolved and have size (height) of 1
  - for connectors to work a node only needs to know its children's sizes (heights)
  - a parent always puts itself at line number `floor(height / 2)` - this is like vertical padding, can reuse `times`
  - we can first transform the model into a hierarchical intermediate model
    ```json
    [
      { "text": "a", "indent": 0 },
      { "text": "b", "indent": 1 }
    ]
    ```
    becomes:
    ```json
    [{ "text": "a", "indent": 0, "children": [{ "text": "b", "indent": 1 }] }]
    ```
    then:
    ```json
    [{ "text": "a", "indent": 0, "rendered": "a b" }]
    ```
- order of rendering; consider this outline:
  ```md
  - a
    - b
      - c
      - d
    - e
  ```
  it would turn into this mm:
  ```
    b c
  a   d
    e
  ```
  - first: (siblins up to cliff)
    ```
    c
    d
    ```
  - then: (add parent)
    ```
    b c
      d
    ```
  - then: (siblins up to end)
    ```
    b c
      d
    e
    ```
  - finally: (add parent)
    ```
      b c
    a   d
      e
    ```
- another example:
  ```md
  - a
    - b
    - c
      - d
    - e
  ```
  becomes this mm:
  ```
    b
  a c d
    e
  ```
  - cliff:
  ```
  d
  ```
  - parent:
  ```
  c d
  ```
  - cliff/end:
  ```
  b
  c d
  e
  ```
  - parent:
  ```
    b
  a c d
    e
  ```
- one more:
  ```md
  - a
    - b
    - c
      - d
    - e
      - f
      - g
    - h
  ```
  becomes this mm:
  ```
    b
    c d
  a e f
      g
    h
  ```
- smaller steps!
  - work backwards
    - hard-code the logic when needed
    - start at the leaf I think
- Horizontally concatenate blocks of multi-line strings
- a leaf is just its text
- all siblins become `.text|join("\n")`
- easier to work with arrays of strings, each element represents a line
- `[["parent "], ["child 1", "child 2"]] | cat` -> `"parent child 1\n child 2"`
- vertical alignment can be done by adding empty strings before the parent
- notice the left-padding before `"child 2"`
- `[["a"], ["b", "c"]] | cat` -> `"ab\n c"`
- `[["","a"],["b","c","d"]] | cat` -> `" b\nac\n d"`
- then we'll need to think about the connecting lines logic
