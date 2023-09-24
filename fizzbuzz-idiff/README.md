hello

```shell
export PATH=/workspace/katas/utils:$PATH
export PATH=/workspace/katas/utils/tcr:$PATH
cargo install jaq --locked
```

# thoughts

- gentler TCR-style workflow: `./test && git add -p && git diff --cached && git commit`
  - add a file watcher
  -
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
    - "help me selectively stage clusters of related changes"
    - cluster/categorize: can start by analyzing the `git diff` to express an intention - which clusters are there?
    - then, iterate over changes to classify to which cluster each of them belongs
      - can iterate using `git add -p` (I think)
        - maybe using python subprocess
          - asked chat: https://chat.openai.com/c/a22b5dfd-3acb-42fd-9953-9771a1ad2020
- commit-msg
  - can share the original intention with chatgpt
    - "our intention was: let's test up to 5"
  - that also goes the other way, when stating intentions:
    - format the intention / add a section that should work as a commit msg
    - the `git log` context is relevant here too
      - just guess what should be the next commit to continue previous commit sequence
- keep historical data in git logs
  - could use structured annotations then parse them with jq per usage
  - or - use `git notes --ref=gpt-suggested-commit-msg add -m 'the commit msg suggested by gpt' <commit-hash>`
  - can then be used and parsed in further prompts
