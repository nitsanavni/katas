from approvaltests import verify, Options


def table(data):
    max_widths = [max([len(str(cell)) for cell in column]) for column in zip(*data)]
    return "\n".join(
        [
            "|"
            + "|".join(
                [
                    f" {str(cell):<{max_widths[i]}} "
                    for i, cell in enumerate(row)
                ]
            )
            + "|"
            for row in data
        ]
    )

def chunk(lst, n):
    return [lst[i : i + n] for i in range(0, len(lst), n)]



def test_table():
    """
    | 0  | 1  | 2  | 3  |
    | 4  | 5  | 6  | 7  |
    | 8  | 9  | 10 | 11 |
    | 12 | 13 | 14 | 15 |
    """
    verify(table(chunk( range(17),4) ), options=Options().inline())