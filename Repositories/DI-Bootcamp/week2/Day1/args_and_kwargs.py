students = ["Harry","Ron","Hermione"]

def welcome(*args):
    if args:
       for name in args:
        print(f"{name}, welcome to Hogwarts!")
    else:
       print("You didn't pass names")

welcome(students)
welcome("Camila", "Niv", "David","Flavia")

def user_info(**kwargs):
   print(kwargs)
   for value in kwargs.values():
      print(value)

    
user_info(name = "Juliana", email = "ju@gmail.com", age = 35, is_online = True, pets = ["cat","dog"])