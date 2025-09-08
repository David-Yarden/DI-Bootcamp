from anagram_checker import AnagramChecker

def main():
    checker = AnagramChecker()

    while True:
        print("\nAnagram Checker")
        print("1. Enter a word")
        print("2. Exit")
        choice = input("Choose an option: ").strip()

        if choice == "1":
            word = input("Enter your word: ").strip()

            # Normalize input to lowercase for processing
            word_lower = word.lower()

            # Validate input
            if " " in word_lower:
                print("Error: Please enter a single word without spaces.")
                continue
            if not word_lower.isalpha():
                print("Error: Please enter a valid word containing only letters.")
                continue

            if not checker.is_valid_word(word_lower):
                print(f"Error: The word '{word}' is not in the dictionary.")
                continue

            anagrams = checker.get_anagrams(word_lower)

            print(f'\nYOUR WORD: "{word.upper()}"')

            print("This is a valid English word.")
            if anagrams:
                print("Anagrams for your word: " + ", ".join(sorted(anagrams)))
            else:
                print("No anagrams found for your word.")

        elif choice == "2":
            print("Goodbye!")
            break

        else:
            print("Invalid choice. Try again.")

if __name__ == "__main__":
    main()
