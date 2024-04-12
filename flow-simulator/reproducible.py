from filecache import filecache


def reproducible(func):
    """
    Designed for testing purposes.
    Decorated functions will return different values between calls but
    the same (aka "a reproducible") sequence of values across executions.
    Uses @filecache.

    example usage:

    @reproducible
    def rand(a, b):
        return random.uniform(a, b)
    """
    sample = 0

    def to_cache(*args, reproducible_sample, **kwargs):
        return func(*args, **kwargs)

    to_cache.__name__ = func.__name__ + "_cached_for_reproducible"

    cached = filecache(to_cache)

    def wrapped(*args, **kwargs):
        nonlocal sample
        sample += 1
        return cached(*args, reproducible_sample=sample, **kwargs)

    return wrapped
