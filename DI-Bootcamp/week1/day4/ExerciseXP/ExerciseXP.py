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
    username = input("Wrong! Guess again: ")
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
pizza_toppings = []
while True:
    new_pizza_topping = input("Choose your pizza toppings one by one, and type quit to finish: ")
    if new_pizza_topping == "quit":
        break
    print(f"Adding {new_pizza_topping} to your pizza")
    pizza_toppings.append(new_pizza_topping)
number_of_toppings = len(pizza_toppings)
pizza_price = 10 + number_of_toppings*2.5
print(f"Your pizza toppings are: {pizza_toppings} and costs ${pizza_price}.")

# -----------------------
# Exercise 9
# -----------------------
total_cost = 0
group = int(input("How many people are buying tickets? "))
for person in range(1, group ):
    age = int(input("What is your age?"))
    if age < 3:
        ticket_price = 0
        total_cost = total_cost + ticket_price
    elif 3<age<13:
        ticket_price = 10
        total_cost = total_cost + ticket_price
    else:
        ticket_price = 15
        total_cost = total_cost + ticket_price
print(f"The total cost for the movie is {total_cost}")
# -----------------------
# Exercise 10
# -----------------------
sandwich_orders = ["Tuna", "Pastrami", "Avocado", "Pastrami", "Egg", "Chicken", "Pastrami"]
for _ in range(sandwich_orders.count("Pastrami")): sandwich_orders.remove("Pastrami")
finished_sandwich = []
for sandwich in sandwich_orders:
    finished_sandwich.append(sandwich)
    print(f"I made your {sandwich} sandwich.")
print(f"Here is the list of all finished sandwiches: {finished_sandwich}")