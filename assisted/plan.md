# inbox

- keeps track of changes
  - the reason to keep track of changes is: allow for refinement by iteration; we need to know what we already tried in order to come up with new attempts
- green state is a good place to start the tracking over
  - doesn't mean we get rid of prev tracking, but we could
- things to include in the context
  - the code
    - function declaration
    - docstring
    - code
    - the whole file
  - test results
- `ReportToChatGPT`
- internal dialogue
- conversation with the user
- event sourcing
  - full snapshots
  - diffs
  - traverse the event stream to (re)construct a prompt
- commit?

## The workflow

high level

- green
  - in this state, running the test is idempotent
- user changes docstring
- runs the test
- **here magic happens**
- user is presented with a diff:
  - the new code **and** potential diffs to the docstring too *vs.* the prev
- "approving" takes us back to green

if the test passes, why would the user not approve?

|                  | test passes   | test fails                         |
| ---------------- | ------------- | ---------------------------------- |
| user approves    | back to green | maybe the user liked the increment |
| user disapproves | why?          |                                    |

### example

starting position, green (no inputs):

```python
@assisted
def fizzbuzz(n: int) -> str:
    """
    """
```

user changes docstring:

```python
@assisted
def fizzbuzz(n: int) -> str:
    """
    1 -> 1
    """
```

BTW the test fails, but this is not exposed to the user.

```diff
+ 1 -> None
- 1 -> 1 
```

user presented with the following diff (aka suggestion):

```diff
  @assisted
  def fizzbuzz(n: int) -> str:
      """
      1 -> 1
      """
+     return "1"
```

user approves, we're back to green.


# Where to start?