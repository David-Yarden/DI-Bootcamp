
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
