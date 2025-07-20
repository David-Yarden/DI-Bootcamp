sentence = input("Input a sentence:")
if sentence.isalpha():
    print("Your sentence is only alphabetic")
else:
    non_alpha_count = sum(1 for char in sentence if not char.isalpha())
    print(f"The sentence has {non_alpha_count} non-alphabetic characters.")
if sentence.endswith('!'):
    print("Your sentence ends with an exclamation mark!")
else:
    print("Your sentence doesn't end with an exclamation mark")
if any(char.isspace() for char in sentence):
    print("Your sentence has whitespace characters")
else:
    print("Your sentence doesn't have whitespace characters")