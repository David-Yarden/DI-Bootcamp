fruits = ["apple", "banana", "cherry", "date", "elderberry"]
print(fruits[0])
print(fruits[2])
# print(fruits[6])Traceback (most recent call last):
#   File "c:\repositories\DI-Bootcamp-prep\TestFolder\Python-tests\Python-Iterables\Lists\Exercise1.py", line 4, in <module>
#     print(fruits[6])
#           ~~~~~~^^^
# IndexError: list index out of range
fruits[1] = "blueberry"
print(fruits)
fruits.append("fig")
print(fruits)
fruits.insert(0,"grap")
print(fruits)
fruits.remove("cherry")
fruits.pop(4)
print(fruits)
fruits.extend(["strawberry","raspberry","cranberry","blackberry"])
print(fruits)
fruits.sort()
print(fruits)
print(fruits[-3:])