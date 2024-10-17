class Transaction:
    # Initializer method for the Transaction class with payee, amount, date, and institution.
    def __init__(self, payee, amount, date, institution):
        self.payee = payee  # Name of the payee involved in the transaction
        self.amount = amount  # Amount of money transacted
        self.date = date  # Date when the transaction took place
        self.institution = institution  # Financial institution managing the transaction

def load_transactions_from_csv(csv_data):
    """
    Reads transactions from a CSV data source and returns a list of Transaction objects.
    """
    transactions = []  # List to store Transaction objects
    csv_reader = csv.DictReader(csv_data)  # Create a CSV reader object to process CSV data

    for row in csv_reader:
        # Create a Transaction object for each row in the CSV and append to transactions list
        transaction = Transaction(
            payee=row['payee'],
            amount=float(row['amount']),
            date=row['date'],
            institution=row['institution']
        )
        transactions.append(transaction)  # Add the transaction to the list
    
    return transactions  # Return the list of Transaction objects