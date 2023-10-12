required workflow: TDD

TDD {
  loop {
    think of the next small(!!) increment
    write a test for this increment
    this test is usually expected to fail because the code is not ready yet
    run the tests
    implement the increment, making the test pass, using the simplest(!!) change, even simpler than that!
    when all tests pass - refactor the code (tests and production) to make more readable, do this in very small steps, until satisfied (this could be 20 steps! don't be shy)
  }
}
