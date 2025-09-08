import string
import re

class Text:
    def __init__(self, text):
        self.text = text

    def word_frequency(self, word):
        words = self.text.lower().split()
        count = words.count(word.lower())
        return count if count > 0 else None

    def most_common_word(self):
        words = self.text.lower().split()
        freq = {}
        for word in words:
            freq[word] = freq.get(word, 0) + 1
        most_common = max(freq, key=freq.get)
        return most_common

    def unique_words(self):
        return list(set(self.text.lower().split()))

    @classmethod
    def from_file(cls, file_path):
        with open(file_path, 'r') as file:
            content = file.read()
        return cls(content)


class TextModification(Text):
    def remove_punctuation(self):
        return self.text.translate(str.maketrans('', '', string.punctuation))

    def remove_stop_words(self, stop_words):
        words = self.text.lower().split()
        filtered = [word for word in words if word not in stop_words]
        return ' '.join(filtered)

    def remove_special_characters(self):
        return re.sub(r'[^a-zA-Z0-9\s]', '', self.text)


sample_text = "Hello! Hello? This is a sample text, with punctuation. And some repeated repeated words."

text_obj = Text(sample_text)

print("Word frequency for 'hello':", text_obj.word_frequency("hello"))
print("Most common word:", text_obj.most_common_word())
print("Unique words:", text_obj.unique_words())

with open('test_file.txt', 'w') as f:
    f.write(sample_text)

file_text_obj = Text.from_file('test_file.txt')
print("From file, most common word:", file_text_obj.most_common_word())

stop_words = {'is', 'a', 'with', 'and', 'some'}

mod_obj = TextModification(sample_text)

print("Remove punctuation:", mod_obj.remove_punctuation())
print("Remove stop words:", mod_obj.remove_stop_words(stop_words))
print("Remove special characters:", mod_obj.remove_special_characters())
