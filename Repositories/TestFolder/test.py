class BankAccount:

    def __init__(self):

        self.__balance = 0



    @property

    def balance(self):

        return self.__balance



    @balance.setter

    def balance(self, amount):

        if amount >= 0:

            self.__balance = amount

acc = BankAccount()
acc.balance = 100
print(acc.balance)  # Output: 100