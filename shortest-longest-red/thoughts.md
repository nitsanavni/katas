- there are additional events / time spent of intereset:
  - waiting for the build
  - build fail / pass
  - waiting for the tests
  - red / green
  - revert
- event logging could be achieved with git actually - each event gets a commit
- file watcher makes it more accurate, and faster feedback
- try fizzbuzz inside out / double loop
- the tracking and reporting mechanism can be extracted to a module (a cli app)
- upgrade: show a real time status:
  ```
  currently: red
  total elapsed: 3:25
  longest red so far: 0:45 (and counting)
  ```
- also: the plot could be regenerated on the fly
- idea: event-based architecture?
- not easy getting Google Sheets to plot the timeline, maybe use python instead
