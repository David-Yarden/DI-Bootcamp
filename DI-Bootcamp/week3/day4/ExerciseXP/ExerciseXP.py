#---------------------------
# Exercise 1
#---------------------------
class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    def __str__(self):
        name = self.currency
        if self.amount != 1:
            name += 's'
        return f"{self.amount} {name}"

    def __repr__(self):
        return self.__str__()

    def __int__(self):
        return self.amount

    def __add__(self, other):
        if isinstance(other, int):
            return self.amount + other  # return int
        elif isinstance(other, Currency):
            if self.currency == other.currency:
                return self.amount + other.amount  # return int
            else:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
        else:
            raise TypeError("Unsupported type for addition")

    def __iadd__(self, other):
        if isinstance(other, int):
            self.amount += other
        elif isinstance(other, Currency):
            if self.currency == other.currency:
                self.amount += other.amount
            else:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
        else:
            raise TypeError("Unsupported type for addition")
        return self

c1 = Currency('dollar', 5)
c2 = Currency('dollar', 10)
c3 = Currency('shekel', 1)
c4 = Currency('shekel', 10)

print(str(c1))   # 5 dollars
print(int(c1))   # 5
print(repr(c1))  # 5 dollars

print(c1 + 5)    # 10 (int)
print(c1 + c2)   # 15 (int)

print(c1)        # 5 dollars (unchanged)

c1 += 5
print(c1)        # 10 dollars

c1 += c2
print(c1)        # 20 dollars

# print(c1 + c3)   # TypeError: Cannot add between Currency type <dollar> and <shekel>


#---------------------------
# Exercise 3
#---------------------------
import string, random

letters = string.ascii_lowercase + string.ascii_uppercase

random_string = ""

for _ in range(5):
    random_char = random.choice(letters)
    random_string += random_char

print(random_string)

#---------------------------
# Exercise 4
#---------------------------

from datetime import datetime
def current_date():
    today = datetime.today()
    return today

print(current_date())

#---------------------------
# Exercise 5
#---------------------------

from datetime import datetime

now = datetime.now()
next_year = now.year + 1
jan_1_next_year = datetime(next_year, 1, 1)
until_jan_1 = jan_1_next_year - now
print(until_jan_1)

#---------------------------
# Exercise 6
#---------------------------
from datetime import datetime
birthdate_string = "18-03-2002"
birthdate = datetime.strptime(birthdate_string, "%d-%m-%Y")
now = datetime.now()
time_lived = now - birthdate
minutes_lived = time_lived.total_seconds() / 60
print(f"You have lived {int(minutes_lived)} minutes.")

#---------------------------
# Exercise 7
#---------------------------
from faker import Faker
users = []
def add_users(n):
    fake = Faker()
    for _ in range(n):
        user = {
            "name": fake.name(),
            "address": fake.address(),
            "language_code": fake.language_code()
        }
        users.append(user)
add_users(5)
print(users)
