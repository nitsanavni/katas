bun.sh
use log-update pkg
a cli timer app
three sections: counter, stopwatch, bpm
each section on its own line
don't show labels just numbers or dashes if nan
counter starts at 0, increment / decrement with up/down arrow keys
stopwatch: controlled with space key, first and second seconds mm:ss:cc, later mm:ss
bpm: 'b' key registers a beat, bpm computed from last 2-7 beats, resets after 3 seconds of inactivity
'q' key quits the app
