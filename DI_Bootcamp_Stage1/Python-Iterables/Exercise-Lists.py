numbers = [1, 2, 3, 4]
for num in numbers:
    print(num)

for num in numbers:
    print(num * 20)

names = ["Elie", "Tim", "Matt"]
first_letters = [name[0] for name in names]
print(first_letters)

numbers2 = [1, 2, 3, 4, 5, 6]
evens = [num for num in numbers2 if num % 2 == 0]
print(evens)

set1 = {1, 2, 3, 4}
list2 = [3, 4, 5, 6]
print(set1.intersection(list2))

reversed_lower = [name.lower()[::-1] for name in names]
print(reversed_lower)

first = "first"
third = "third"
both = [letter for letter in first if letter in third]
print(both)

div12 = [num for num in range(1, 101) if num % 12 == 0]
print(div12)

word = "amazing"
no_vowels = [ch for ch in word if ch not in "aeiou"]
print(no_vowels)

result = [[0, 1, 2] for _ in range(3)]
print(result)

structure = [list(range(10)) for _ in range(10)]
print(structure)
