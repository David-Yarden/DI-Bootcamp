#----------
#Exercise 3
#----------
from ExerciseXP import Dog
import random

class PetDog(Dog):
    def __init__(self, name, age, weight): 
        super().__init__(name, age, weight)
        self.trained = False

    def train(self): 
        print(self.bark())
        self.trained = True

    def play(self, *args):
        names = ", ".join([dog.name for dog in args])
        print(f"{self.name}, {names} all play together.")

    def do_a_trick(self): 
        if self.trained:
            tricks = ["does a barrel roll", "stands on his back legs", "shakes your hand", "plays dead"]
            print(f"{self.name} {random.choice(tricks)}")


dog1 = PetDog("Fido", 2, 10)
dog2 = PetDog("Buddy", 3, 12)
dog3 = PetDog("Max", 4, 14)

dog1.train()          
dog1.play(dog2, dog3) 
dog1.do_a_trick()     

#----------
#Exercise 4
#----------

class Person():
    def __init__(self, first_name, age, last_name=""):
        self.first_name = first_name
        self.age = age
        self.last_name = last_name

    def is_18(self):
        if self.age >= 18:
            return True
        else:
            return False


class Family():
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []  

    def born(self, first_name, age):
        new_person = Person(first_name, age, self.last_name)
        self.members.append(new_person)

    def check_majority(self, first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print("You are over 18, your parents Jane and John accept that you will go out with your friends")
                else:
                    print("Sorry, you are not allowed to go out with your friends.")
                return
        print("Person not found.")

    def family_presentation(self):
        print(f"Family: {self.last_name}")
        for member in self.members:
            print(f"{member.first_name}, {member.age} years old")


my_family = Family("Smith")
my_family.born("Alice", 10)
my_family.born("Bob", 20)

my_family.family_presentation()

my_family.check_majority("Alice")
my_family.check_majority("Bob")
