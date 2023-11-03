Following [this exercise](../tbd-ff/README.md) about feature flags in trunk-based development, we now practice using feature branches.

# Guidelines

- Automatic: branches should be automatically rebased
- Small: branches should contain as little changes as possible
    - That means some (most) work towards the feature happens on `main`
    - Only `F` and `t` commits happen on `feature`, `r` commits happen on `main`
- WIP <= 1: let's start with one feature at a time; would also be interesting to practice with more concurrent branches
- Test both: both the main branch _and_ the topic branch should be tested; `main` stays green while working on the feature, accumulating `r` commits


## Workflow

- Again, we start grenfield
- Until first release can work directly on `main`
- Once released, start using feature branches, `main` accumulates `r` commits, `feature` can have `t`, `F` commits
- How to "release"? git tags? git notes? let's go with tags. No let's do empty commits.

# Thoughts

- TCR
- transitioning from `1-100` to `fizzbuzz`
    - what I did: created a `logic` placeholder function on `main` for the `fizzbuzz` logic with the identity filter, then branched and made changes inside `logic` to impl fizzbuzz
    - problems:
        1. on the main branch `logic` is a valid candidate for inlining
            - could mitigate with more descriptive names / comments
            ```jq
            def fizzbuzz_feature_placeholder: .;
            def logic: fizzbuzz_feature_placeholder;
            ```
        2. while impl the fizzbuzz feature I noticed that I could branch on less, by focusing on "special cases"
           on `feature-fizzbuzz`:
           ```jq
           def logic(special_cases): ...;
           ... | logic([[15, "FizzBuzz"], [3,"Fizz"], [5, "Buzz"]])
           ```
           
           on `main` - no special cases
           ```jq
           def logic(special_cases): ...;
           ... | logic([])
           ```
            - so should I go back to `main` with this new understanding?
                - I think I should at least try to
            - another option: continue on the `feature` branch until a separable design is easy, and only then take it to `main`
- can we write it like this: `def fizzbuzz: fizz | buzz | `; I don't think so...
