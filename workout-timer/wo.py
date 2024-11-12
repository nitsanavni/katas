import curses
import time


def main(stdscr):
    # Initialize curses and hide cursor
    curses.curs_set(0)
    stdscr.nodelay(True)

    counter = 0
    timer_active = False
    start_time = None
    beat_times = []
    bpm = 0

    while True:
        stdscr.clear()
        height, width = stdscr.getmaxyx()

        # Counter (controlled by UP/DOWN arrows)
        key = stdscr.getch()
        if key == curses.KEY_UP:
            counter += 1
        elif key == curses.KEY_DOWN:
            counter -= 1
        stdscr.addstr(1, width // 2 - 5, f"{counter}")

        # Timer (controlled by SPACE)
        if key == ord(" "):  # Toggle timer with SPACE
            timer_active = not timer_active
            if timer_active:
                start_time = time.time()

        elapsed_time = time.time() - start_time if start_time and timer_active else 0
        if elapsed_time < 1:
            timer_str = f"{int(elapsed_time // 60):02}:{int(elapsed_time % 60):02}:{int((elapsed_time * 100) % 100):02}"
        elif elapsed_time < 2:
            timer_str = f"{int(elapsed_time // 60):02}:{int(elapsed_time % 60):02}:{int((elapsed_time * 10) % 10)}"
        else:
            timer_str = f"{int(elapsed_time // 60):02}:{int(elapsed_time % 60):02}"

        stdscr.addstr(2, width // 2 - 5, timer_str)

        # BPM (Shift key to record beat)
        if key == ord(
            "\t"
        ):  # Shift not detected directly in curses, using TAB as proxy
            current_time = time.time()
            # Keep only the last 4 beats
            beat_times.append(current_time)
            if len(beat_times) > 4:
                beat_times.pop(0)

            # Calculate intervals
            if len(beat_times) > 1:
                intervals = [
                    beat_times[i] - beat_times[i - 1] for i in range(1, len(beat_times))
                ]
                avg_interval = sum(intervals) / len(intervals)
                bpm = 60 / avg_interval
            else:
                bpm = 0

        bpm_str = f"{int(bpm):d}" if bpm > 0 else "--"
        stdscr.addstr(3, width // 2 - 5, bpm_str)

        # Refresh display
        stdscr.refresh()
        time.sleep(0.05)


# Run the curses application
curses.wrapper(main)
