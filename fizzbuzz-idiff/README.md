```shell
export PATH=/workspace/katas/utils:$PATH
export PATH=/workspace/katas/utils/tcr:$PATH
cargo install jaq --locked
```

# thoughts

-   gentler TCR-style workflow: `./test && git add -p && git diff --cached && git commit`
    -   add a file watcher
    -   add the diff to the commit msg?
    -   chat gpt to give the commit msg!
-   refined: `./test && git add -p && git diff --cached && git commit -t <(./commit-msg 2>&1)`
    -   the `commit-msg` script uses gpt to title the commit
