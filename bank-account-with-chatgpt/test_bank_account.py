class BankAccount:
    def print_statement(self):
        print("Date       || Amount || Balance")


print("Test: print statement of a new account")

account = BankAccount()

account.print_statement()

print("Test: print statement after single deposit")
