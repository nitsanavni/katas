# GPTize as-a-Process

GaaP

Based on Arlo Belshee's Automation-as-a-Process

A thought in progress

# Background

Coding requires many skills / actions / activities.
Some are automatable (e.g. `extract method`, `compile`, `type-check`, `release`, `reformat file`)
Traditionally, in software, automation was thought of just more software. Which is pretty magical for us software developers.

Now, with the help of GPT, more things are automatable.

Some of the most common / well-known / obvious ones are:

- `/generate`: write a function that does XYZ
- `/explain` [code|cli command|cli output|test results]
- `/fix`: find the cause of a problem (given the problem and the code that produces it) / fix it (using /generate)

When combined with traditional automation, namely scripting, more things become automatable, e.g.:

- Authoring commit messages
- Out of all the changes in files, commit only the ones about feature X
- follow a workflow, e.g. TDD - 'TDD cop'

GPT / LLM has the following qualities

- its interface and main 'material' is language
- it displays some intelligence: understanding, deciding, creating, inferring
- in-context learning
- has knowledge, especially about standard and well-known things; specifically, programming stuff

-

# AaaP

nothing automated ->  
checklist / decision tree, human takes actions, verifies ->  
program tells human what to do, human takes action, verifies ->  
program decides, takes action, verifies autonomously
