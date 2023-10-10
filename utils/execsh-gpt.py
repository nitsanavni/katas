#!/usr/bin/env python3

import sys
import json
import os
import pexpect

prompt_template = """
# Task

suggest a command to execute in a shell, based on a given request
you may retrieve information from the shell itself - construct a command to get the information
if the command is more than a simple oneliner - only suggest the next step and command to execute this step

constraint: avoid long outputs e.g. git log, use git log -n X instead
!important! constraint: dont ask the user for clarification, just infer intent

if there's nothing more to do - respond with:

{{
    "thinking": "done!",
    "summary": "summarize all that was done",
    "exec": "echo done!"
}}

# Response format

- only respond with json with no code blocks!
- !important! never use a code block in your responses!! just valid json
- follow this json structure (but remove the backticks):

{{
  "thinking": "your thinking here",
  "exec": "pwd"
}}

- keep your thinking short

# Request to execute

{query}

# Previous commands and results

{CMDS_AND_RESULTS}
"""


CMDS_AND_RESULTS = []

# set an environment variable
os.environ['EXECSHEOC'] = 'execsheoc'
shell = pexpect.spawn('/bin/sh')
# pass our entire environment to the shell
# shell = pexpect.spawn('/bin/sh', env=os.environ)
# shell.sendline("unset PROMPT_COMMAND")

while True:
    query = " ".join(sys.argv[1:])
    PROMPT = prompt_template.format(query=query, CMDS_AND_RESULTS=json.dumps(CMDS_AND_RESULTS))

    chat_cmd_response = json.loads(pexpect.run("chat", args=[PROMPT]))

    thinking = chat_cmd_response.get('thinking', '')
    exec_cmd = chat_cmd_response.get('exec', '')

    print("thinking:\n", thinking, "\n")
    
    print("exec:\n", exec_cmd, "\n")

    if exec_cmd == "echo done!":
        break

    exec_cmd_and_echo = exec_cmd + ";echo $EXECSHEOC"
    shell.sendline(exec_cmd_and_echo)
    shell.expect("execsheoc", timeout=1)
    # EXEC_RESULT = shell.before.decode().split(";true execsheoc", 1)[1]
    EXEC_RESULT = shell.before.decode()
    EXEC_EXIT_CODE = shell.status

    print("EXEC_RESULT:", EXEC_RESULT.strip())

    CMDS_AND_RESULTS.append({
        "cmd": exec_cmd,
        "result": EXEC_RESULT.strip(), 
        "exit_code": str(EXEC_EXIT_CODE)
})