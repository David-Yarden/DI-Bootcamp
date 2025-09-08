#----------
#Exercise 1
#----------
class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'
class Siamese(Cat):
    def sing(self, sounds):
        return f"{sounds}"


bengal_obj = Bengal("Bobi", 3)
chartreux_obj = Chartreux("Mimi", 5)
siamese_obj = Siamese("Luna", 2)

all_cats = [bengal_obj, chartreux_obj, siamese_obj]

sara_pets = Pets(all_cats)

sara_pets.walk()

#----------
#Exercise 2
#----------

class Dog():
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight
    
    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        speed = self.weight / self.age * 10
        return speed

    def fight(self, other_dog):
        dog1_power = self.weight * self.run_speed()
        dog2_power = other_dog.weight * other_dog.run_speed()
        if dog1_power > dog2_power:
            return f"{self.name} wins against {other_dog.name}"
        else:
            return f"{other_dog.name} wins against {self.name}"

# Create dog instances
dog1 = Dog("Rex", 4, 20)
dog2 = Dog("Max", 3, 30)
dog3 = Dog("Nasus", 1000, 500)

# Test
print(dog1.bark())
print(dog2.run_speed())
print(dog1.fight(dog2))
print(dog2.fight(dog3))
print(dog1.fight(dog3))

