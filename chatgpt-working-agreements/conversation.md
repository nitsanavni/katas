# Nitsan 1

let's pair on a code kata together

I'd like us to agree on the workflow between us (we can always revisit it later in the session).

I will keep track of our goals, and working agreements in a file so we can always be reminded of them while we work

You're much better with words, so you'll do the phrasing.

here are my suggestions for the working agreements:

-   pair on a code kata
-   use strong-style pairing between us; we can switch roles as we progress through the exercise
-   the goal is to learn, sharpen skills, and especially _how_ to learn and work _together_ - a human and an LLM
-   use approval tests (I have a utility ready for us)
-   commit often
-   make extremely small steps - actually, after making a step, it's ok to micro-retro and see if it could have been by more smaller steps
-   no planning ahead, no design up-front, let's see if something emerges
-   TDD
-   let's use typescript
-   I'll take care of executing our code on my workspace

if any of these require more explanation or elaboration, we'll add them as we go

now, please can you make this into a very compact file? I will store it for us. Also - how should we name this file?

# ChatGPT 1

Here is a compact version of the working agreements:

```markdown
1. Pair on a code kata
2. Strong-style pairing; switch roles as needed
3. Focus: learning, skill sharpening, collaboration
4. Use approval tests
5. Commit frequently
6. Take tiny steps; micro-retro after each step
7. No upfront planning/design
8. TDD approach
9. TypeScript language
10. User executes code in workspace
```

You could name this file "Pairing_Working_Agreements.md" to keep it descriptive and easy to find.

# Nitsan 2

gitpod /workspace/katas/chatgpt-working-agreements (main) $ ls
conversation.md pairing-working-agreements.md
gitpod /workspace/katas/chatgpt-working-agreements (main) $ cat pairing-working-agreements.md
_pairing-working-agreements.md_

1. Pair on a code kata
2. Strong-style pairing; switch roles as needed
3. Focus: learning, skill sharpening, collaboration
4. Use approval tests
5. Commit frequently
6. Take tiny steps; micro-retro after each step
7. No upfront planning/design
8. TDD approach
9. TypeScript language
10. User executes code in workspace
    gitpod /workspace/katas/chatgpt-working-agreements (main) $ git log .
    gitpod /workspace/katas/chatgpt-working-agreements (main) $ h
    1 mkdir chatgpt-working-agreements
    2 cd chatgpt-working-agreements/
    3 code conversation.md
    4 code pairing-working-agreements.md
    5 ls
    6 cat pairing-working-agreements.md
    7 git log .
    8 h

---

I think now is a good time to commit, and I'd like to also add a README.md file here.
Also - which kata should we work on?
Oh yeah, and I'll initialize a bun.js project here and add the approvals utility.

# ChatGPT

Great! You can go ahead and commit the changes. To create a README.md file, you can simply run:

```bash
Copy code
touch README.md
```

Then, open it with your preferred editor and add some initial content, such as:

```markdown
# Code Kata Pairing Session

This repository contains our working agreements and conversation logs for a code kata pairing session between a user and ChatGPT, an AI language model. We're using TypeScript, strong-style pairing, and approval tests to learn and collaborate.

## Working Agreements

Refer to [pairing-working-agreements.md](pairing-working-agreements.md) for the complete list of our working agreements.
```

As for the kata, let's work on the "String Calculator" kata, which is a popular choice for practicing TDD and incremental development. You can find the problem statement here: http://osherove.com/tdd-kata-1/

Once you've decided on the kata, go ahead and initialize the bun.js project and add the approvals utility. Then, let's get started on the kata!

# Nitsan 3
