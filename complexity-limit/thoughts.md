- I still don't fully grasp why `flow` doesn't work, it's something to do with the functions being too high order I think
- ~~my current conclusion is that you can't go below a max complexity of 2~~
- updated conclusion - you can push complexity to lodash, and have own code be with complexity 1
  here's the cyclomatic complexity in lodash: https://github.com/lodash/lodash/blob/master/.internal/baseFindIndex.js#L16
- higher order functions are not easy to read
- I think I'm missing some simplifying rules for fp
- did not commit often (almost not at all)
- should probably prune the tests - according to https://jay.bazuzi.com/Characteristics-of-Ideal-Tests/ - "1 defect == 1 test failure"
- can be done using ~~`reduce`~~ `find` - done - reached complexity of 1
- the question is - is `find` really less complex than `if`? not really, but it's a more intent-revealing construct
