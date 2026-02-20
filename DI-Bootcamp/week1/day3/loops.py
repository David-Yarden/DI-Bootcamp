fruits = ["apple", "orange","mango", "banana"] # list of strings
for thing in fruits:
    print(thing)

#  sequences that we can loop through
for char in "Harry": # string
    print(char)
# list: example above

# tuples and sets

languages =  ("FR","ES","EN") # tuple
for lang in languages:
    print(lang)

# ranges

for i in range(0,12,3): # start, stop, step
    print("hello", i)

for i, thing in enumerate(fruits):
    if thing == "apple":
        fruits[i] = "Windows is better."
        print(f"Fruit {i} is {thing} ")    
    else:
        print(f"Fruit {i} is {thing} ")

print(fruits)

#f strings
name = "Harry"
age = 24
print(f"Hi, my name is {name} and I'm {age} years old.")

