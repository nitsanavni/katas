Report ApprovalTests diffs directly inside Gitpod

Read more about Gitpod [here](https://www.gitpod.io/docs/getting-started).

Read more about ApprovalTests [here](https://github.com/approvals/ApprovalTests.Python).

# Create a Gitpod Workspace
Open this link in a browser to create a new workspace:
https://gitpod.io/#https://github.com/nitsanavni/katas

In the terminal, switch to the `approvals-in-gitpod` folder:
```sh
$ cd approvals-in-gitpod
```

# Run
## Installations
```sh
$ pip install pytest, approvaltests, black
```

## Run the tests
```sh
$ pytest
```

You should see the diff reported using the IDE's diff tool.
