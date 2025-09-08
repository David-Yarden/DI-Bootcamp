#classes  and objects
#how to create a class

class Dog:
    def bark(self):
        print(f"{self.name} is barking!")
    def run(self):
        if self.age <= 5:
            print(f"{self.name} is running really fast")
        elif 6 < self.age < 9:
            print(f"{self.name} is running")
        else:
            print(f"{self.name} doesn't want to run")
    #the constructor
    def __init__(self, name, color, age):
        self.name = name
        self.color = color
        self.age = age
        self.is_trained = False
    def walk(self, meters):
        print(f"{self.name} is walking {meters} meters.")
    def rename(self, new_name):
        self.name = new_name
        return self
    
dog1 = Dog("Rex","brown", 10)
print(dog1.name)
print(dog1.color)
print(dog1.age)
print(dog1.__dict__)
dog1.breed = "Puddle"
print(dog1.breed)

dog2 = Dog("Max","gold", 3)
dog2.breed = "Golden Retriever"
print(dog2.name)
print(dog2.color)
print(dog2.age)
print(dog2.breed)


print(dog2.is_trained)

dog3 = Dog("Fluffy","white",7)
dog3.is_trained = True
print(dog3.name)
print(dog3.age)
print(dog3.is_trained)
print(type(dog3))


dog1.bark()
dog1.run()
dog2.run()
dog3.run()
dog3.walk(500)
Dog.run(dog3)
Dog.walk(dog3,200)
dog3.rename("Xuxa")
print(dog3.name)

