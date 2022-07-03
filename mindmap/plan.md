# in

- idea! for markdown snapshot, we can create our own "received" md file, and snapshot its contents using `t.snapshot`
- in an outline, parents precede their children
- recursively - a parent is to the left of its children
  - we need a way to append blocks of strings (multi-line strings) horizontally

## thinking about arch

### things

- capture commands from stdin
- commands manipulate the model
  - model is kept in memory in the form of `Node[]`
- async - model is persisted to file in outline format
- view is based on ~~file~~model and projected (rendered) to stdout in mindmap format
- in-memory (global? / shared?) state: `mode: "type" | "navigate"`
- node "typing" mode is handled by a `readline.interface`
- mindmap "navigation" mode disallows keys to be reflected to stdout

- ✅ `cli`
  - get `filePath` from `argv`
- ✅ `parse`
  - outline string to `Node[]`
- `read-file`
  - uses `cli.filePath`
  - ✅ reads file
  - ✅ if not exists - creates the file and initialize it with empty outline
  - ✅ uses `parse`
  - ✅ emits `initialNodes: Node[]`
- ⌛ `write-file`
  - listens to `model.changed`
  - uses `outline-format`
  - asynchronously persists to the file
  - debounce? throttle?
- ✅ `mindmap-format`
  - `(nodes: Node[]) => string` or maybe `(nodes: Node[]) => Line[]`
- ✅ `ouline-format`
- a `mode`
  - app state
  - listens to `key`
    - e.g. enter ->
  - listens to `line` -> gets out of `"type"`
  - `export const mode: "type" | "nav"`
  - emits changes to mode
- a `keyMap`:
  - listens to `key`
  - emit `command`
  - listen to `mode`
  - key to command mapper
- ✅ a `model`
  - ✅ responds to `command`
  - ?? responds to `view.editor.line`
    - not sure this is needed actually...
  - ✅ mutates `nodes` with "transforms" - e.g. `home`
  - ✅ emits `changed`
  - ✅ exports `getNodes`
- a `keys`:
  - how to test drive this guy?
  - owns the `stdin.on("keypress")`
  - emits keys
- a `view`:
  - responds to `model.changed`
  - owns `stdout`
  - owns `input` / `editor`
    - owns `readline.interface`
    - emits `line`
  - formats the model
  - sends to `stdout`
  - knows the `mode` state
    - allows / blocks typing to appear on `stdout`

```
enter -> (we're in "nav") add sibling command -> model.addSibling() (+ select new node)
                             `> mode = "type"
```

### not now

- configurable key bindings
