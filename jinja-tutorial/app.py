from flask import Flask, render_template
from datetime import datetime

app = Flask(__name__)


@app.route("/")
def root():
    day_of_week = datetime.now().strftime("%A")
    return render_template(
        "index.html",
        day_of_week=day_of_week,
    )


@app.route("/time")
def time():
    time = datetime.now().strftime("%H:%M:%S")
    return render_template(
        "time.html",
        time=time,
    )


if __name__ == "__main__":
    app.run()
