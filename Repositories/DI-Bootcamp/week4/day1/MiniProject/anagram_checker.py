import os

class AnagramChecker:
    def __init__(self):
        # Locate sowpods.txt in the same folder as this file
        dir_path = os.path.dirname(os.path.realpath(__file__))
        sowpods_file = os.path.join(dir_path, 'sowpods.txt')
        self.words = self.load_words(sowpods_file)

    def load_words(self, filepath):
        """Load dictionary words in lowercase."""
        with open(filepath, 'r') as f:
            return {line.strip().lower() for line in f if line.strip()}

    def is_valid_word(self, word):
        """Check if word is in dictionary (case-insensitive)."""
        return word.lower() in self.words

    def is_anagram(self, word1, word2):
        """Return True if word1 and word2 are anagrams."""
        return sorted(word1.lower()) == sorted(word2.lower())

    def get_anagrams(self, word):
        """Return all anagrams of the given word, excluding the word itself."""
        word = word.lower()
        if not self.is_valid_word(word):
            return []
        return [w for w in self.words if self.is_anagram(word, w) and w != word]
