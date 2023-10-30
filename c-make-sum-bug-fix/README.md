fix bug in example code from eye-tracking research, from code reading learning hour

## original code screenshot

![code screenshot](makeSum%20C%20code.png)

## plan

- [x] OCR it
- [x] build it
- [x] exec it
    - [x] `make run` hangs
        - because you need to pass an input, `scanf` prob waits forever
        - [x] yes, you can. can you pass stdin to `make run`? it must be possible
        - [x] can gpt spot the reason for the hang?
- [ ] put it under an approval test
    - [x] we should have a make target for this `verify`
        - `echo 3 | make -s run | verify -t make-sum-3 -d idiff`
        - it would be nice to have gpt integrated into the terminal
            - maybe `chat` could have its own subshell at its disposal
            - it could look like a hint that the user can accept, like copilot, like some zsh plugins
- [ ] [mutation test]
- [ ] spot the bug
- [ ] fix the bug

# learned

- vscode extension sees the env vars of the parent process whom spawned `code`
    - so, first - export env vars
    - from this shell - spawn a new `code`