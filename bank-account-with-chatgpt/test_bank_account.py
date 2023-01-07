class BankAccount:
    def __init__(self):
        self.transactions = []

    def deposit(self, amount):
        self.transactions.append(amount)

    def print_statement(self):
        print("Date       || Amount || Balance")
        balance = 0
        for t in self.transactions:
            balance += t
            print("           ||    %5d    ||    %5d" % (t, balance))


print("Test: print statement of a new account")

account = BankAccount()

account.print_statement()

print("\nTest: print statement after single deposit")

account.deposit(1000)

account.print_statement()

print("\nTest: print statement after multiple deposits")

account.deposit(1000)
account.deposit(2000)
account.deposit(-500)

account.print_statement()
