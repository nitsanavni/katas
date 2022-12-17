def defeats:
    {
        rock: "scissors",
        scissors: "paper",
        paper: "rock"
    };

def defeated_by:
    {
        rock: "paper",
        scissors: "rock",
        paper: "scissors"
    };

def own_plays:
    {
        X: "rock",
        Y: "paper",
        Z: "scissors"
    };

def second_column_outcomes:
    {
        X: "lose",
        Y: "draw",
        Z: "win"
    };

def opponent_plays:
    {
        A: "rock",
        B: "paper",
        C: "scissors"
    };

def round_outcome_scores:
    {
        lost: 0,
        draw: 3,
        won: 6
    };

def shape_scores:
    {
        rock: 1,
        paper: 2,
        scissors: 3
    };

def total_round_score:
    .round_outcome_score + .shape_score;

def round_outcome_score:
    .round_outcome as $outcome | round_outcome_scores[$outcome];

def round_outcome:
    if .ours == .theirs
    then "draw"
    elif defeats[.ours] == .theirs
    then "won"
    else "lost"
    end;

def parse:
    split(" ") | { theirs: opponent_plays[.[0]], ours: own_plays[.[1]] };

def parse2:
    split(" ") | { theirs: opponent_plays[.[0]], outcome: second_column_outcomes[.[1]] };

def choose_shape:
    if .outcome == "draw"
    then .theirs
    elif .outcome == "win"
    then defeated_by[.theirs]
    else defeats[.theirs]
    end;

def round_score:
    parse |
    ({round_outcome:round_outcome} | round_outcome_score) + shape_scores[.ours];

def sum_them_up:
    split("\n") | map(select(. != "") | round_score) | add;
