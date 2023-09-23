```shell
export PATH=/workspace/katas/utils:$PATH
export PATH=/workspace/katas/utils/tcr:$PATH
cargo install jaq --locked
```

# thoughts

- gentler TCR-style workflow: `./test && git add -p && git diff --cached && git commit`
  - add a file watcher
  - add the diff to the commit msg?
  - chat gpt to give the commit msg!
- refined: `./test && git add -p && git diff --cached && git commit -t <(./commit-msg 2>&1)`
  - the `commit-msg` script uses gpt to title the commit
- more ideas for `commit-msg`
  - share `git log --oneline -n 15` with gpt
- tried using model gtp-3.5-turbo, it's doing worse than gpt-4 for naming commits
- using copilot is more clunky than cursor, more keystrokes for same result
- idea: co-create with AIs
  - human/gpt: TDD cop - high level intention
    - "tests are passing let's refactor" / "/refactor"
    - "let's make the failing test pass" / "/suggest next test"
    - "let's make this test fail for a better reason"
  - gpt: talking - lower-level intention - describe the next change to code
    - "!only! change the line with condition 5 to use the modulo operator"
  - copilot: typing
  - in-context learning
    - for each layer, track the AI-suggestion and the human correction. Just like with the commit msgs
- looking at commit history, commits are not small enough
  - sometimes bundling docs / scripts / code
  - can selectively add to make them even smaller
  - this should be automatable with gpt too
