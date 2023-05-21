- premature abstraction
  - a new way to extract duplication at the specs level!
    - two specs can be combined into a third one
  - what happens when we add `7:whizz`? We'll need one more reducer
- actually the 1st reducer is just a `find`
- dev loop
  - single frame for focus - a single terminal
  - minimalistic
  - loop: {
      test (verify + approval)
      edit code
    }
  - limitation: single file (also an advantage, in terms of focus)
- tools
  - ctrl+A - increments an interger in vi, apparently
- double loop TDD for the `condition` filter ("filter" is jq's reusable construct, like a function)
- make the change easy, then make the easy change
  - when?! when is red? but we shouldn't refactor in red...
  - red is where we
    - think and choose next micro requirement
    - write a test
      - may require design
    - see it fail for a good reason
  - now that we have a good failing test - we're starting to think about impl
  - we could simply implement it in the most obvious way, and iterate and refactor from there, under green tests until we're satisfied with the code - but where does 'make the change easy' fit here? The change is already done.
  - either you 'make the change easy' under red before getting to green - it's a special kind of red - only the last test should keep failing, and for the same reason - maybe this could be called orange
    - with approval tests, we sometimes approve an incorrect result, so we can clearly see when it becomes correct later in te process
  - or maybe you revert to green (e.g. skip the last test) and then focus on making the change easy
