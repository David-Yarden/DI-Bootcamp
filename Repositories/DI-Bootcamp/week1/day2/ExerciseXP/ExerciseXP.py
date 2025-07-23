# -----------------------
# Exercise 1
# -----------------------
print("Hello World "*5)
# -----------------------
# Exercise 2
# -----------------------
math = 99^3
print(math*8)
# -----------------------
# Exercise 3
# -----------------------
# >>> 5 < 3 Output: False
# >>> 3 == 3 Output: True
# >>> 3 == "3" Output: False
# >>> "3" > 3 Output: False
# >>> "Hello" == "hello" Output: False
# -----------------------
# Exercise 4
# -----------------------
computer_brand = "Gigabyte"
print(f"I have a {computer_brand} computer")
# -----------------------
# Exercise 5
# -----------------------
first_name = "David"
age = 23
shoe_size = 48
info = f"My name is {first_name}, I am {age} years old and my shoe size is {shoe_size}."
print(info)
# -----------------------
# Exercise 6
# -----------------------
a=2
b=1
if a>b:
    print("Hello World")
# -----------------------
# Exercise 7
# -----------------------
number = int(input("Pick a number: "))
if number % 2 != 0:
    print("your number is odd")
else:
    print("your number is even")
# -----------------------
# Exercise 8
# -----------------------
my_name = "David"
username = input("What's your name? ")
if my_name == username:
    print(f"My name is also {my_name}, this town ain't big enough for the two of us.")
else:
    print(f"Nice to meet you {username}.")
# -----------------------
# Exercise 9
# -----------------------
user_height = int(input("What is your height in centimeters? "))
required_height = 145
if user_height > required_height :
    print("You are tall enough to ride a roller coaster.")
else :
    print("You need to grow up to ride a roller coaster")