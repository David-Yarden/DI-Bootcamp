number = int(input("input a number: "))
length = int(input("input a length: " ))
multiples = []
for i in range(1, length + 1):
    multiples.append(number * i)
print(multiples)

word = input("input a word with consecutive duplicate letters: ")
letters = []
last_character = ""
for character in word:
    if character != last_character:
        letters.append(character)
        last_character = character
new_word = "".join(letters)
print(new_word)