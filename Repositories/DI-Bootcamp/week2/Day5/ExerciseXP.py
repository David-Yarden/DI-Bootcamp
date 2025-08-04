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

# ----------------
# Exercise 2
# ----------------

class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height

    def bark(self):
        print(f"{self.name} is barking!")

    def jump(self):
        print(f"{self.name} is jumping {self.height * 2} cm high!")

davids_dog = Dog("Max", 33)
sarahs_dog = Dog("Rex", 22)

davids_dog.jump()
sarahs_dog.jump()

# ----------------
# Exercise 3
# ----------------

class Song:
    def __init__(self, lyrics):
        self.lyrics = lyrics
    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)

stairway = Song(["There’s a lady who's sure", "all that glitters is gold", "and she’s buying a stairway to heaven"])
stairway.sing_me_a_song()

# ----------------
# Exercise 4
# ----------------

class Zoo:
    def __init__(self, zoo_name):
        self.zoo_name = zoo_name
        self.animals = []

    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)

    def get_animals(self):
        print(self.animals)

    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)

    def sort_animals(self):
        self.animals.sort()
        grouped = {}
        for animal in self.animals:
            first_letter = animal[0].upper()
            if first_letter not in grouped:
                grouped[first_letter] = [animal]
            else:
                grouped[first_letter].append(animal)
        return grouped

    def get_groups(self):
        groups = self.sort_animals()
        for letter, animals in groups.items():
            print(f"{letter}: {animals}")

brooklyn_safari = Zoo("Brooklyn Safari")

brooklyn_safari.add_animal("Giraffe")
brooklyn_safari.add_animal("Bear")
brooklyn_safari.add_animal("Baboon")
brooklyn_safari.get_animals()
brooklyn_safari.sell_animal("Bear")
brooklyn_safari.get_animals()
brooklyn_safari.sort_animals()
brooklyn_safari.get_groups()