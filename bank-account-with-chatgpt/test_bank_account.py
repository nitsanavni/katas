class BankAccount:
    def print_statement(self):
        pass


account = BankAccount()
statement = account.print_statement()
print(f"Test: print statement of a new account")
print(f"The statement of the bank account is:\n{statement}")
