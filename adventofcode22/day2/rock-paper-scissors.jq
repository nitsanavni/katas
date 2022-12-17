def defeats:
    {
        rock: "scissors",
        scissors: "paper",
        paper: "rock"
    };

def own_plays:
    {
        X: "rock",
        Y: "paper",
        Z: "scissors"
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

def round_score:
    parse |
    ({round_outcome:round_outcome} | round_outcome_score) + shape_scores[.ours];
