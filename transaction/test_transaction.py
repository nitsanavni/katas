def test_load_transactions_from_csv():
    """
    Test function to ensure load_transactions_from_csv correctly parses CSV data into Transaction objects.
    """
    # Create in-memory CSV data to simulate reading from a file
    csv_data = StringIO(
        "payee,amount,date,institution\n"
        "John Doe,100.0,2023-10-24,Bank of Example\n"
        "Jane Smith,200.0,2023-10-25,Bank of Test\n"
    )

    # Parse the CSV data using the load_transactions_from_csv function
    transactions = load_transactions_from_csv(csv_data)

    # Assert that two transactions were created and each field is correctly populated
    assert len(transactions) == 2
    assert transactions[0].payee == "John Doe"
    assert transactions[0].amount == 100.0
    assert transactions[0].date == "2023-10-24"
    assert transactions[0].institution == "Bank of Example"
    assert transactions[1].payee == "Jane Smith"
    assert transactions[1].amount == 200.0
    assert transactions[1].date == "2023-10-25"
    assert transactions[1].institution == "Bank of Test"