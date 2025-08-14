import os
import random
import sys

def get_words_from_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    words = content.split()
    return words

def get_random_sentence(length):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    word_file = os.path.join(script_dir, 'words.txt')
    words = get_words_from_file(word_file)
    sentence = ' '.join(random.choice(words) for _ in range(length))
    return sentence.lower()

def main():
    print("This program generates a random sentence from a word list.")
    user_input = input("Enter sentence length (2-20): ")
    if not user_input.isdigit():
        print("Error: Please enter a valid integer.")
        sys.exit(1)
    length = int(user_input)
    if length < 2 or length > 20:
        print("Error: Length must be between 2 and 20.")
        sys.exit(1)
    sentence = get_random_sentence(length)
    print("Random sentence:")
    print(sentence)

if __name__ == "__main__":
    main()
