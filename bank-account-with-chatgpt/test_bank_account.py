class BankAccount:
    def __init__(self):
        self.transactions = []

    def deposit(self, amount):
        self.transactions.append(amount)

    def print_statement(self):
        print("Date       || Amount || Balance")
        for i, t in enumerate(self.transactions):
            balance = sum(self.transactions[:i+1])
            print(f"           || {t}    || {balance}")

# Test: print statement of a new account


print("Test: print statement of a new account")

account = BankAccount()

account.print_statement()

# Test: print statement after single deposit

print("Test: print statement after single deposit")

account.deposit(1000)

account.print_statement()
