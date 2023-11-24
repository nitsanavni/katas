## inbox, things to try

- test with executable command + mock
- self-test
- loop, feedback
  - test exec
  - gpt-3 reviews
- AI uses tools, make it aware of available "tools" - existing functions
- AI builds tools
- AI does planning
- a tool belt / library
  - each tool has metadata, number of usages, successes, effectiveness... reliability, 
- human does e2e / sanity tests, AI does its own unit tests
- extract a decorator (or class?) `@generated_fn`
  - make it aware of available functions
  - separate stages: `generate_code`, `implement`, `add_to_lib`, `exec`, `test`
  - if we conform to common standard / interface, could be easier
    - the code is a single function in a module
    - `if __name__ == "__main__"` an example call to the function with results written to stdout
    - it also has tests

modes
- human generates results (like writing the approved file)

### cognitive tasks / activities / work

1-7 scale means: my current impression of how adept at task/work the 



| work                                                  | NI  | AI  | code |
| ----------------------------------------------------- | --- | --- | ---- |
| set a goal                                            | 5   | 3   | 1    |
| approve test results                                  | 6   | 6   | 1    |
| break/slice work to smaller peices                    | 5   | 4   | 1    |
| produce consistent results                            | 1   | 4   | 6    |
| understand problems in unbounded context              | 6   | 3   | 1    |
| carry out instructions                                | 3   | 4   | 6    |
| one shot manually write code to meet small req        | 3   | 5   | 1    |
| create a dev workflow                                 | 4   | 2   | 1    |
| execute code                                          | 2   | 3   | 7    |
| use tools to refactor code                            | 5   | 3   | 1    |
| given concrete feedback: understand the problem / gap | 6   | 6   | 1    |
| come up with ideas to solve **narrow** problems       | 5   | 6   | 1    |
| come up with ideas to solve **wide** problems         | 6   | 3   | 1    |
|                                                       |     |     |      |

to be fair, we should factor for speed and cost
we'd like to distribute the work in an economical way
- play to the strenghs of each worker
- but it should factor in speed and cost
  - a NI's attention is very slow, expensive, and unpredictable
  - an AI's is much faster, cheaper - so can work in much shorter feedback cycles or concurrent multiple drafts, which could compensate for lack of generality and strengh
  - code is even faster and cheaper but totally lacks intelligence - we should offload as much work as possible to code; all repeatable, well defined work
- another thing is:
  - code needs to be written and maintained, once it's written we can exploit it
  - AIs need to be prompted well, once the prompt is refined it can then be exploited too
  - NIs have very limitted work capacity, workarounds exist such as training, effective workflows

## Learned

- print to stderr in order to separate info from results; results can then be easily verified (in the approval tests sense)
```python
print("info, not to be verified", file=sys.stderr)
```

## Round 1

- tests written normally - e.g. w/ `verify`
- try to only use gpt-3.5-turbo
- prod only uses `ai_fn`

thoughts

- gpt-3 can't handle is much more difficult to tame
- but! gpt-3.5-turbo-1106 can! and it's much faster, more than 2X faster
  | model              | fizzbuzz 1-25 execution time [sec] |
  | ------------------ | ---------------------------------- |
  | gpt-3.5-turbo-1106 | ~4-6.5                             |
  | gpt-4-1106-preview | ~11-16                             |
- interesting: it didn't jump directly to "15 -> FizzBuzz"
- having gpt generate each iteration takes too long
  - but! if we concurrentize - we should try this
  - yes chatgpt showed me how to run iterations concurrently
- co-pilot is helping writing the prompts, it's not amazing but helpful

## Round 2

AI to write code

round 1 was: AI generates results  
round 2 is: AI generates code that when executed generates results

## Round 3

again

thoughts

- encapsulate `function`

```python
def function(signature: str):
    definition = implement(signature)
    name = parse_name(signature)

    def define:
        exec(definition)

    def call:
        exec(f"{name}()")
    
    return (define, call)
```

maybe a `class` would be better

- self-test, in a loop
- the tests could be a separate @ai_fn
- AI can test its stuff (autonomously), I'll test my stuff

## Round 4 - use an existing function

- if we use `exec`, I think we're in the same interpreter process, so previously defined functions should be available - [right](./example_exec_uses_defined_function.py)
- 