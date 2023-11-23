Intention

- a tool
- helps with refactoring
- Arlo's Commit Notation

Curious:

How to get something from / to the AI from within a tool?
How to avoid the copy-pasting back-and-forth from the ChatGPT App?

Currently:

workflow:

- click on identifier
- say "rename" using the tool
- copy paste into the ChatGPT UI on the web:
  1. a prompt: "I'm gonna give you a diff..."
  2. a diff using `git diff`
- copy the response fro the AI into the git commit

in Michael's own words

1) Make small refactoring
2) git diff | pbcopy
3) paste prompt to ChatGPT in browser
4) paste git-diff into browser
5) Chat generates git-commit message
6) Copy ChatGPT reply into git-commit box in IntelliJ


The tool should automatically:
1. prompt chat
2. use the response to commit

```pseudo-code
function auto_commit() {
    git diff |>
    build prompt |>
    prompt gpt |>
    git commit -m
}

watch files |> try to auto_commit()
```

Example prompt to generate a commit message (from Michael)

```
I want you to create a git-commit message.
I will give you a "git diff" output.
Look for simple rename variable refactorings.
If you find one, format output like this ". r Rename variable w to width" or "Rename function hypot(x, y) to hypotenuse(x, y)"
```

## Ideas

- ChatGPT opens GitHub and pastes into the commit message box
- Suggestion - Open 2-way read/write "pipe" from IntelliJ to a ChatGPT "client" (thus avoiding manual human copy/paste)