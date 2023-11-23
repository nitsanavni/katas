## inbox, things to try

- self-test
- loop, feedback
  - test exec
  - gpt-3 reviews
- make it aware of available "tools" - existing functions
- AI builds tools
- AI does planning
- human does e2e/sanity tests, AI does its own unit tests

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