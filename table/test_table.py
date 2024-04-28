from approvaltests import verify, Options

def table(data):
    if not data:
        return ""
    # Calculate the maximum number of columns any row could have
    max_columns = max(len(row) for row in data)
    # Adjust the list comprehension to only consider up to the number of elements in each row
    max_widths = [max(len(str(row[i])) for row in data if i < len(row)) for i in range(max_columns)]
    
    return "\n".join(
        "|"
        + "|".join(
            f" {str(cell):<{max_widths[i]}} " if i < len(row) else f" {'':<{max_widths[i]}} "
            for i, cell in enumerate(row)
        )
        + "|"
        for row in data
    )

def chunk(lst, n):
    return [lst[i : i + n] for i in range(0, len(lst), n)]

def test_table():
    """
    | 0  | 1  | 2  | 3  |
    | 4  | 5  | 6  | 7  |
    | 8  | 9  | 10 | 11 |
    | 12 | 13 | 14 | 15 |
    | 16 |
    """
    verify(table(chunk(range(17), 4)), options=Options().inline())

