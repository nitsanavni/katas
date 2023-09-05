def filter(filterExp):
    map(select(filterExp));

def odd: . % 2 != 0;
def even: . % 2 == 0;

[range(10)] |
(
    "odd:",
    filter(odd),
    "",
    "even:",
    filter(even)
)
