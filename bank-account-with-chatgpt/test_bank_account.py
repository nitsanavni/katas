class BankAccount:
    def print_statement(self):
        print("Date       || Amount || Balance")

    def deposit(self, amount):
        pass


print("Test: print statement of a new account")

account = BankAccount()

account.print_statement()

print("------------------------")


print("Test: print statement after single deposit")

account.deposit(100)

account.print_statement()
