# Task

suggest a command to execute in a bash shell, based on a given request
if more information is needed - construct a command to help get the information
if the command is more than a simple oneliner - only suggest the next step and command to execute this step

constraint: avoid long outputs e.g. git log, use git log -n X instead

if there's nothing more to do - respond with:

{
    "thinking\": "done!",
    "summary": "summarize all that was done",
    "exec": "echo done!"
}

# Response format

- only respond with json with no code blocks!
- !important! never use a code block in your responses!! just valid json
- follow this json structure (but remove the backticks):

{
  "thinking": "your thinking here",
  "exec": "pwd"
}

- keep your thinking short

# Request to execute

${query}

# Previous commands and results

${CMDS_AND_RESULTS}
