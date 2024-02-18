Here's the thought process that got us here.

Key concepts: Tennis Scoring, refactoring, kata, approval tests, inline approvals

- I've been practicing and talking to Friends about the **Tennis Refactoring kata** lately. At one point it occurred to us to visit the **Wikipedia** page for Tennis Scoring. Apparently the **French scoring** of Tennis game is not a straight forward translation from English but it has slight interesting variations, specifically around 'deuce' ('égalité').
- So my next intention was to "refactor" a `TennisGame` to **support the French scoring**. I shouldn't say "refactor". Maybe "extend"? In my mind it would have to go through some refactoring before the extension can be achieved.
- I then though I should change the way the tests are expressed.  
  Existing tests look like this (simplified):  
```python
assert play_game(1, 1, "Service", "Receiver").score == "Fifteen-All"
```  
I thought they should be stated like this:  
```python
assert play_game(points_scored_sequence="sr").score == "Fifteen-All"
```  
This means that first the Server scored a point and then the Receiver scored a point. Each character 'r' / 's' represents a point scored.

Note: now I think that this is unnecessary, and that the existing testing scheme would work fine for the subtleties of the French scoring system.

- Taking it a step further, I thought we could express a longer game like this:  
  `"s3r"`, which is equivalent to `"sssr"`  
  `"(sr)2"` -> `"srsr"`  

- So I set out to implement this new testing scheme, based on a string of characters.
- First step: I'd start by writing an `expand` function, to go from `"s3"` to `"sss"`. Its test would look like this:  
```python
def test_expand():
    """
    s -> s
    s3 -> sss
    (rs)3r -> rsrsrsr
    """
    verify(
        "\n".join(
            [
                f"{s} -> {expand(s)}"
                for s in [
                    "s",
                    "s3",
                    "(rs)3r",
                ]
            ]
        ),
        options=Options().inline(),
    )
```
- [ChatGPT](https://chat.openai.com/share/060a4e53-81e7-411d-adbc-f2a393369396) was able to write the `expand` function within a few iterations
- Now I noticed duplication in my test code. The inputs to `expand` appear twice in the test code.
- Changing direction: 🤔 Could we infer the inputs directly from the docstring?
- So the exercise now changed direction - we're no longer in Tennis, we're in testing frameworks (again).