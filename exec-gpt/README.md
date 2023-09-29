exec-gpt is a bash script that

- gets a query from the user from cli, e.g. `exec-gpt create the file fizzbuz.py with a simple hello world inside it`
- it then call chatgpt via the api using the `chat` script. example usage: `chat hello`
- the prompt it sends to gpt asks gpt to execute bash cmds on the calling host
- gpt is to answer in json: {"thinking": "..", "exec": <the bash cmd to execute>}
- the script then prints the thinking and exec (can parse with jq)
- then is executes the exec
- and it calls gpt again with a similar prompt as before
- gpt continues to respond with the same json structre, until it is satisfied that it's done (or it's stuck)
- this loop ends when gpt responds with {"thinking":"...", "exec": "echo done!"}
