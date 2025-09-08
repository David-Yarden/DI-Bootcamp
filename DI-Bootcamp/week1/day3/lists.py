user_name = "david"
email = "david.yarsen@gmail.com"
user_age = 23
is_online = True

user_info = [user_name, email, user_age, is_online]
print(len(user_info))

some_list = ("item 1")
other_list = ["item 1", "item 2"]

print(some_list)
print(other_list)
empty_list = []

print(user_info[2])

fruits = ["orange", "kiwi","apple","lime"]
print(fruits)
fruits.remove("kiwi")
print(fruits)
fruits.append("mango")
print(fruits)
fruits.pop(1)
print(fruits)

vegs = ["tomato","potato","carrot"]

fruits.extend(vegs)
print(fruits)

fruits.append(vegs)
print("2",fruits)

fruits_sorted = sorted(fruits)
print(fruits)
print(fruits_sorted)

fruits.sort()
print(fruits)