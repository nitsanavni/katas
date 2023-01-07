class BankAccount:
    def __init__(self):
        self.transactions = []

    def deposit(self, amount):
        self.transactions.append(amount)

    def withdraw(self, amount):
        self.transactions.append(-amount)

    def print_statement(self):
        balance = 0
        print(f"{'Date':>10} || {'Amount':>7} || {'Balance':>7}")
        for transaction in self.transactions:
            balance += transaction
            print(f"{' ':>10} || {transaction:>7} || {balance:>7}")


print("Test: print statement of a new account")
account = BankAccount()
account.print_statement()

print("\nTest: print statement after single deposit")
account = BankAccount()
account.deposit(1000)
account.print_statement()

print("\nTest: print statement after multiple deposits")
account = BankAccount()
account.deposit(1000)
account.deposit(1000)
account.deposit(2000)
account.withdraw(500)
account.print_statement()
