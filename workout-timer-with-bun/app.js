import logUpdate from "log-update";

let counter = 0;
let stopwatchTime = 0;
let stopwatchRunning = false;
let bpmTimestamps = [];

function formatTime(time) {
  let minutes = Math.floor(time / 6000);
  let seconds = Math.floor((time % 6000) / 100);
  let centiseconds = time % 100;

  return time < 200
    ? `${minutes}:${seconds.toString().padStart(2, "0")}:${centiseconds.toString().padStart(2, "0")}`
    : `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function calculateBPM() {
  const now = Date.now();
  bpmTimestamps = bpmTimestamps.filter((ts) => now - ts <= 3000); // only keep last 3s
  if (bpmTimestamps.length < 2) return "---";

  const intervals = bpmTimestamps
    .slice(1)
    .map((time, idx) => time - bpmTimestamps[idx]);
  const averageInterval =
    intervals.reduce((a, b) => a + b, 0) / intervals.length;
  return Math.round(60000 / averageInterval);
}

function updateDisplay() {
  logUpdate([counter, formatTime(stopwatchTime), calculateBPM()].join("\n"));
}

function handleKeypress(data) {
  const now = Date.now();
  const key = data.toString();

  if (key === "\u001B\u005B\u0041") {
    // up arrow
    counter++;
  } else if (key === "\u001B\u005B\u0042") {
    // down arrow
    counter--;
  } else if (key === " ") {
    // space
    stopwatchRunning = !stopwatchRunning;
  } else if (key === "b") {
    bpmTimestamps.push(now);
  } else if (key === "q") {
    restoreCursor();
    process.exit();
  }

  updateDisplay();
}

function tick() {
  if (stopwatchRunning) {
    stopwatchTime += 1;
  }
  updateDisplay();
}

function restoreCursor() {
  process.stdout.write("\u001B[?25h"); // ANSI escape code to show the cursor
}

process.stdin.setRawMode(true);
process.stdin.on("data", handleKeypress);

setInterval(tick, 10);
updateDisplay();
