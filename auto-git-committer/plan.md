## BIG WHY 
*eliminate toil with a git-commit-message-generator* 
to generate commit messages from simple refactorings from git-diff
it is awkward to paste the diff and the prompt into the browser and copy the GPT generated message out
instead: create a pipe or command line that does not depend on the browser
integrate that small piece into a workflow that allows us stay inside of the IDE. (i.e Visual Stuio)
tool: figure out the commit message, paste it into the place that it needs to go
and 
allow the users to EDIT before commit

instead of: auto-git-committer
how about this name: git-commit-message-generator 

git-commit-message-generator:


# small why
can I give it a better prompt so that it will give me a useful git-commit message
    by useful I mean:  present it to me in a standard format
    so that I can easily see  the parts of the message
  it extracts the intent into a well formatted git-commit message

git-commit-message-generator
to generate commit messages for us in a very simple way
it gives us the commit message, what we do with it is up to us
have ChatGPT recognize standard refactorings and generate commit messages

the commit message can be derived, so you do not have to do the work of trying to decide what the git-commit message
prompt GPT to Tell me why we made this change was made.
that explains what has happened.
is there any info that needs to be put into the commit message?
does this tool free you up to describe the HIGHER level of intent?

do the tool so the humans can focus on higher level thinking.
tell me the SUMMARY of these 4 commits. (head minus 7 and head minus 12)
  summarize it as one.

# plan / ideas

- refine the prompt
- ask chat: do you know Arlo's Commit Notation?
- recognize that it's a refactoring
- can it recognize a diff with "rename var", "rename method", etc. ?
- write down all problems / responsibilities there are to solve
- give an output message in the right format
- does the tool decide **when** to trigger a commit?
- "sub-problems" / sub-routines

## problems

- Does ChatGPT recognize what type of refactoring was done?
  - sub: can it recognize the "basic five"? (rename, )
  - let's choose another one on top of "rename"
- Need to stage the diff (`git add`) and only then `git commit`
- Format the message in Arlo's Commit Notation



## NOTES
auto-git-committer
seemed like:  watch me and then choose the CORRECT moment
to 

instead of: auto-git-committer
how about this name: git-commit-message-generator 

Discussion:
Kinds of toil:
1. copy/paste to/from IDE/Browser
2. generate git-commit message (in form of <refactoring-name> <old-identifier> [<new-identifier>]"
   
for this we don't need to care about  the details
these details don't have an impact on anything else

if our high level of intent were to have world peace, then 