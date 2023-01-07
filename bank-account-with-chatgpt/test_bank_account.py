class BankAccount:
    def print_statement(self):
        print("Date       || Amount || Balance")


print("Test: print statement of a new account")
print("------------------------")

account = BankAccount()
account.print_statement()

print("\nTest: print statement after single deposit")
print("------------------------")

# code for depositing into account here
account.print_statement()
