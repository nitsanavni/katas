from verified import verified


@verified
def upper(s: str) -> str:
    """
    a -> A
    b -> B
    c -> C
    """
    return s.upper()


test_upper = upper.verify
