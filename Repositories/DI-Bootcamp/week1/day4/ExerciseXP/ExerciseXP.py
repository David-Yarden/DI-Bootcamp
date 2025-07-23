# -----------------------
# Exercise 1
# -----------------------
my_fav_numbers = {12,69,420,77,99}
my_fav_numbers.add(33)
my_fav_numbers.add(2)
print(my_fav_numbers)
my_fav_numbers.remove(2)
print(my_fav_numbers)
friend_fav_numbers = (4, 9, 56, 12, 67)
print(friend_fav_numbers)
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)
print(our_fav_numbers)
# -----------------------
# Exercise 2
# -----------------------
integer_tuple = (2,54,632,214)
print(integer_tuple)
# integer_tuple.add(3) This doesn't work and gets this error below in comment because tuples are immutable, meaning they can't be modified.
# integer_tuple.add(3)
    # ^^^^^^^^^^^^^^^^^
# AttributeError: 'tuple' object has no attribute 'add'
# -----------------------
# Exercise 3
# -----------------------
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
print(basket)
basket.remove("Banana")
print(basket)
basket.remove("Blueberries")
print(basket)
basket.append("Kiwi")
print(basket)
basket.insert(0,"Apples")
print(basket)
print(basket.count("Apples"))
basket.clear()
print(basket)
# -----------------------
# Exercise 4
# -----------------------
float_and_integer = [x * 0.5 + 1 for x in range(1, 8)]
print(float_and_integer)
# -----------------------
# Exercise 5
# -----------------------
number_loop = [0]
for number in number_loop:
    number_loop = [number + 1 for number in range(0,20)]
print(number_loop)
# -----------------------
# Exercise 6
# -----------------------
my_name = "David"
username = input("Guess my name: ")
while username != my_name:
    username = input("Wrong! Guess again :")
print("You guess correctly!")
# -----------------------
# Exercise 7
# -----------------------
fav_fruits = input("Input your favorite fruits, separated by spaces: ").split()
print(fav_fruits)
fruit_selection = input("Name any fruit: ")
if fruit_selection in fav_fruits:
    print("You chose one of your favorite fruits! Enjoy!")
else:
    print("You chose a new fruit. I hope you enjoy it!")
# -----------------------
# Exercise 8
# -----------------------

# -----------------------
# Exercise 9
# -----------------------

# -----------------------
# Exercise 10
# -----------------------
