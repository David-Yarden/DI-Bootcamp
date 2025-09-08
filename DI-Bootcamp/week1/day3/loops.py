fruits = ["apple", "orange","mango", "banana"]
for fruit in fruits:
    print(fruit)

#  sequences that we can loop through
for char in "Harry":
    print(char)
# list: example above

# tuples and sets

languages =  ("FR","ES","EN")
for lang in languages:
    print(lang)

# ranges

for i in range(0,11,2):
    print("hello", i)

for i, fruit in enumerate(fruits):
    if fruit == "apple":
        fruits[i] = "Windows is better."
        print(f"Fruit {i} is {fruit} ")    
    else:
        print(f"Fruit {i} is {fruit} ")

print(fruits)