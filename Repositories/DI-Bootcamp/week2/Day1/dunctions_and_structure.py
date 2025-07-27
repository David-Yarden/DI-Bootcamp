students = ["Harry","Ron","Hermione"]

def welcome():
    for name in students:
        print(f"{name}, welcome to Hogwarts!")


welcome()

def get_house(students):
   for i, name in enumerate(students):
        students[i] = f"{name} - Gryffyndor"

get_house(students)
print(students)

