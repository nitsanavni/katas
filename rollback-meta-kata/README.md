# What If...?

What if we practiced rolling back functionality, instead of adding functionality?

In small decrements, safely remove functionality, all the while keeping the code well factored.

We still want to follow TDD.

-   Starting position - fully covered, well factored code, all tests passing
-   Loop
    -   Remove a test (which? 🤷🏻)

Actually!

A "failing test" in this context would be to first remove the production code, and making exactly one test fail.

Loop:

-   [optional] preparatory refactoring to make the removal of behavior easy, obvious, isolated
-   remove code such that a single test fails due to its absence
-   remove the failing test
-   refactor

Another option is, instead of directly removing a test, first make it fail by asserting the absence of the feature.

## Is Absence Defined?

-   The absence of `Fizz` is `n` - meta - special case vs the default, or the null-value
-   The absence of concatenating `Fizz` + `Buzz`, is not concatenating, maybe just `Fizz` - meta - an operation vs not doing the operation
-   The absence of an entity (e.g. a function) is a "not found error"
-

The test looks almost identical to its original, except for the assertion

How does this look like with approvals?

These tests are meant to be temporary, and removed once the feature is removed

A kata could go like this:

Loop:

-   add a feature
-   remove it
-   add it again

## thoughts

-   an env var that makes `verify` disregard certain diffs e.g. `(todo)`, in its presence (dev) the tests pass, in its absence (on CI) they fail
-   double approvals: you approve a diff;

when APPROVALS_DOING=true:

```
diff = received - (approved + doing)
```

two stages approval in case of non-empty diff:

1. set as doing? yes - done
2. set as approved?

when APPROVALS_DOING not set:

```
diff = received - approved
```

received and approved are full documents (results)
diff and doing are diffs

"doing" / "wip"
