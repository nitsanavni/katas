vim, exec a vim cmd (e.g. :12./s/old/new/) on a file directly from cli
To execute a Vim command directly from the command line on a file, you can use the `+` or `-c` option with Vim. Here is an example command for your use case:

```sh
vim +':12s/old/new/' +wq filename
```

or alternatively:

```sh
vim -c '12s/old/new/' -c 'wq' filename
```

This command opens the specified file, executes the `:12s/old/new/` substitution command, and then writes and quits (`wq`). Adjust `filename` to your target file.
