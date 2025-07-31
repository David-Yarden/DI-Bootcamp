# ----------------
# Exercise 1
# ----------------
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

# Step 1: Create cat objects
# cat1 = create the object
cat1 = Cat("Doudou", 14)
cat2 = Cat("Miaou", 5)
cat3 = Cat("Chaton", 1)
# Step 2: Create a function to find the oldest cat
def find_oldest_cat(*cats):
    oldest = cats[0]
    for cat in cats:
        if cat.age < oldest.age:
            oldest = cat
        return oldest
    # ... code to find and return the oldest cat ...

# Step 3: Print the oldest cat's details
oldest_cat = find_oldest_cat(cat1, cat2, cat3)
print(f"The oldest cat is {oldest_cat.name} and is {oldest_cat.age} years old.")

# ----------------
# Exercise 2
# ----------------

class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height
    def bark(self):
        print(f"{self.name} is barking!")