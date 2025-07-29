# -----------------------
# Exercise 1
# -----------------------
def display_message():
    print("I am learning about functions in Python.")
display_message()
# -----------------------
# Exercise 2
# -----------------------
def favorite_book(title):
    print(f"One of my favorite books is {title}")
favorite_book("Alice in Wonderland")
# -----------------------
# Exercise 3
# -----------------------
def describe_city(city, country = "Unknown"):
    print(f"{city} is in {country}")
describe_city("Tel Aviv", "Israel")
describe_city("Reykjavik", "Iceland")
describe_city("Paris")
# -----------------------
# Exercise 4
# -----------------------
import random
def number(n):
    if 1 <= n <= 100:
        print(f"The number {n} is within the range.")
        random_number = random.randint(1,100)
        if random_number == n :
            print("Success!")  
        else :
            print(f"Fail! Your number: {n}, Random number: {random_number}")
    else:
        print("Error: Number must be between 1 and 100.")
number(6)
# -----------------------
# Exercise 5
# -----------------------
def make_shirt(size = "large",text = "I love Python"):
    print(f"Your shirt is {size} size and has {text} for the text.")
make_shirt("XL","Banana")
make_shirt()
make_shirt("large")
make_shirt("medium")
make_shirt("small","Peanuts")
make_shirt(size="small", text="Hello!")
# -----------------------
# Exercise 6
# -----------------------
magician_names = ["Harry Houdini", "David Blaine", "Criss Angel"]
def show_magicians(magician_names):
    for name in magician_names:
        print({name})
def make_great(magician_names):
    for name in magician_names:
        print(f"{name} the Great")
make_great(magician_names)
show_magicians(magician_names)         
# -----------------------
# Exercise 7
# -----------------------
def get_random_temp():
    random_temp = random.uniform(-10,40)
    return random_temp
def main():
    random_temp = get_random_temp()
    print(f"The temperature right now is {random_temp} degrees Celsius.")
    if random_temp < 0:
        print("Brrr, that’s freezing! Wear some extra layers today.")
    elif 0 <= random_temp < 16:
        print("Quite chilly! Don’t forget your coat.")
    elif 16 <= random_temp < 23:
        print("Nice weather.")
    elif 24 <= random_temp < 32:
        print("A bit warm, stay hydrated.")
    else:
        print("It’s really hot! Stay cool.")
main()