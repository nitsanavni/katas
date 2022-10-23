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
jaq -rf mindmap-render-test-command.jq mindmap-render-test.json | parallel
```
