Changes required: Extract the condition checking if the line is a comment into a separate function and use early return to simplify the logic.

### File: `./find_mutations_in_line.py`

```python
def is_comment(line):
    return line.strip().startswith("#")

def find_mutations(line):
    if is_comment(line):
        return []
    return [("s", "vi")]
```
