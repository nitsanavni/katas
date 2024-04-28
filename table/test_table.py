from approvaltests import verify, Options

def table(data):
    if not data:
        return ""
    # Calculate the maximum number of columns any row could have
    max_columns = max(len(row) for row in data)
    # Adjust the list comprehension to only consider up to the number of elements in each row
    max_widths = [max(len(str(row[i])) for row in data if i < len(row)) for i in range(max_columns)]
    
    formatted_rows = []
    for row in data:
        # Ensure the row has the same number of columns as max_columns by padding with empty strings
        padded_row = list(row) + [''] * (max_columns - len(row))
        formatted_row = "|"
        formatted_row += "|".join(
            f" {str(cell):<{max_widths[i]}} " for i, cell in enumerate(padded_row)
        )
        formatted_row += "|"
        formatted_rows.append(formatted_row)
    
    return "\n".join(formatted_rows)

def chunk(lst, n):
    return [lst[i : i + n] for i in range(0, len(lst), n)]

def test_table():
    """
    | 0  | 1  | 2  | 3  |
    | 4  | 5  | 6  | 7  |
    | 8  | 9  | 10 | 11 |
    | 12 | 13 | 14 | 15 |
    | 16 | 17 |    |    |
    """
    verify(table(chunk(range(18), 4)), options=Options().inline())
