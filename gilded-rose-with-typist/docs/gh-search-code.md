
Search within code in GitHub repositories.

The search syntax is documented at:
<https://docs.github.com/search-github/searching-on-github/searching-code>

Note that these search results are powered by what is now a legacy GitHub code search engine.
The results might not match what is seen on github.com, and new features like regex search
are not yet available via the GitHub API.

For more information about output formatting flags, see `gh help formatting`.

USAGE
  gh search code <query> [flags]

FLAGS
      --extension string   Filter on file extension
      --filename string    Filter on filename
  -q, --jq expression      Filter JSON output using a jq expression
      --json fields        Output JSON with the specified fields
      --language string    Filter results by language
  -L, --limit int          Maximum number of code results to fetch (default 30)
      --match strings      Restrict search to file contents or file path: {file|path}
      --owner strings      Filter on owner
  -R, --repo strings       Filter on repository
      --size string        Filter on size range, in kilobytes
  -t, --template string    Format JSON output using a Go template; see "gh help formatting"
  -w, --web                Open the search query in the web browser

INHERITED FLAGS
  --help   Show help for command

JSON FIELDS
  path, repository, sha, textMatches, url

EXAMPLES
  # search code matching "react" and "lifecycle"
  $ gh search code react lifecycle
  
  # search code matching "error handling" 
  $ gh search code "error handling"
  	
  # search code matching "deque" in Python files
  $ gh search code deque --language=python
  
  # search code matching "cli" in repositories owned by microsoft organization
  $ gh search code cli --owner=microsoft
  
  # search code matching "panic" in the GitHub CLI repository
  $ gh search code panic --repo cli/cli
  
  # search code matching keyword "lint" in package.json files
  $ gh search code lint --filename package.json

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual

