# -----------------------
# Challenge 1
# -----------------------
string = input("Type a few words separated by commas: ")
word_list = string.split(",")
word_list.sort()
sorted_string = ",".join(word_list)
print(sorted_string)
# -----------------------
# Challenge 2
# -----------------------
def longest_word(sentence):
    words = sentence.split(" ")
    longest = ""
    for word in words:
        if len(word) > len(longest):
            longest = word
    return longest
print(longest_word("I love Python"))

