Inspiration: https://github.com/michelgrootjans/explaining-flow

# Thoughts

- discovery / vertical slicing
- rework / code review / defects
  - procrastination amplification effect
    - reduce the probability of picking up this task over others based on item age in queue
- big deploys / sprints
- recency factor - faster to fix when still in memory
- a `Worker` could have multiple people, a "Work Group", a stream
- working with random, seed, filecache
  - seed is like caching with auto-incrementing `sample` arg
- working out the timeline
  - testing: tell the full story of the events
  - tracking
    - clock ticks
    - when starting to work on a task, register the end time to be evaluated
      - at each evaluation point
        - mark tasks as done
        - mark people as available - if people are homogeneous this becomes an increment
        - assign per availability
- `@filecache` for testing random stuff
  - can extract another decorator to do the auto-increment `sample`