
Search for repositories on GitHub.

The command supports constructing queries using the GitHub search syntax,
using the parameter and qualifier flags, or a combination of the two.

GitHub search syntax is documented at:
<https://docs.github.com/search-github/searching-on-github/searching-for-repositories>
 

For more information about output formatting flags, see `gh help formatting`.

USAGE
  gh search repos [<query>] [flags]

FLAGS
      --archived                    Filter based on the repository archived state {true|false}
      --created date                Filter based on created at date
      --followers number            Filter based on number of followers
      --forks number                Filter on number of forks
      --good-first-issues number    Filter on number of issues with the 'good first issue' label
      --help-wanted-issues number   Filter on number of issues with the 'help wanted' label
      --include-forks string        Include forks in fetched repositories: {false|true|only}
  -q, --jq expression               Filter JSON output using a jq expression
      --json fields                 Output JSON with the specified fields
      --language string             Filter based on the coding language
      --license strings             Filter based on license type
  -L, --limit int                   Maximum number of repositories to fetch (default 30)
      --match strings               Restrict search to specific field of repository: {name|description|readme}
      --number-topics number        Filter on number of topics
      --order string                Order of repositories returned, ignored unless '--sort' flag is specified: {asc|desc} (default "desc")
      --owner strings               Filter on owner
      --size string                 Filter on a size range, in kilobytes
      --sort string                 Sort fetched repositories: {forks|help-wanted-issues|stars|updated} (default "best-match")
      --stars number                Filter on number of stars
  -t, --template string             Format JSON output using a Go template; see "gh help formatting"
      --topic strings               Filter on topic
      --updated date                Filter on last updated at date
      --visibility strings          Filter based on visibility: {public|private|internal}
  -w, --web                         Open the search query in the web browser

INHERITED FLAGS
  --help   Show help for command

JSON FIELDS
  createdAt, defaultBranch, description, forksCount, fullName, hasDownloads,
  hasIssues, hasPages, hasProjects, hasWiki, homepage, id, isArchived, isDisabled,
  isFork, isPrivate, language, license, name, openIssuesCount, owner, pushedAt,
  size, stargazersCount, updatedAt, url, visibility, watchersCount

EXAMPLES
  # search repositories matching set of keywords "cli" and "shell"
  $ gh search repos cli shell
  
  # search repositories matching phrase "vim plugin"
  $ gh search repos "vim plugin"
  
  # search repositories public repos in the microsoft organization
  $ gh search repos --owner=microsoft --visibility=public
  
  # search repositories with a set of topics
  $ gh search repos --topic=unix,terminal
  
  # search repositories by coding language and number of good first issues
  $ gh search repos --language=go --good-first-issues=">=10"
  
  # search repositories without topic "linux"
  $ gh search repos -- -topic:linux
  
  # search repositories excluding archived repositories
  $ gh search repos --archived=false
   

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual

