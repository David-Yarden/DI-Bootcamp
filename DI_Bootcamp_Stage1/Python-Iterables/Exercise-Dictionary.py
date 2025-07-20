list1 = [("name", "Elie"), ("job", "Instructor")]
dic1 = dict(list1)
print(dic1)
abv = ["CA", "NJ", "RI"]
cities = ["California", "New Jersey", "Rhode Island"]
pair = zip(abv, cities)
dict2 = dict(pair)
print(dict2)
vowels = "aeiou"
vowel_dict = {vowel: 0 for vowel in vowels}
print(vowel_dict)
alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
for index, letter in enumerate(alphabet, start=1):
    print(index, letter)
string ="awesome sauce"
vowel_counts = {v: string.count(v) for v in vowels}
print(vowel_counts)