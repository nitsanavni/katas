fix bug in example code from eye-tracking research, from code reading learning hour

## original code screenshot

![code screenshot](makeSum%20C%20code.png)

## plan

- [x] OCR it
- [x] build it
- [ ] exec it
    - [ ] `make run` hangs
        - because you need to pass an input, `scanf` prob waits forever
        - can you pass stdin to `make run`? it must be possible
        - [ ] can gpt spot the reason for the hang?
- [ ] put it under an approval test
- [ ] [mutation test]
- [ ] spot the bug
- [ ] fix the bug

# learned

- vscode extension sees the env vars of the parent process whom spawned `code`
    - so, first - export env vars
    - from this shell - spawn a new `code`