# ----------------
# Exercise 1
# ----------------
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

cat1 = Cat("Doudou", 14)
cat2 = Cat("Miaou", 5)
cat3 = Cat("Chaton", 1)

def find_oldest_cat(*cats):
    oldest = cats[0]
    for cat in cats:
        if cat.age < oldest.age:
            oldest = cat
        return oldest


oldest_cat = find_oldest_cat(cat1, cat2, cat3)
print(f"The oldest cat is {oldest_cat.name} and is {oldest_cat.age} years old.")
