import random
string = input("Type a 10 characters string: ")
string_length = len(string)
if string_length<10:
    print("String not long enough.")
elif string_length>10:
    print("String too long.")
else:
    print("Perfect string.")
    print(string[0] + string[-1])
    for character in range(1, len(string)+1):
        print(string[:character])
    letters = list(string)
    random.shuffle(letters)
    shuffled_string = ''.join(letters)
    print(shuffled_string)
