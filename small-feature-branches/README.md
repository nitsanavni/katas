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
- 

# Thoughts

