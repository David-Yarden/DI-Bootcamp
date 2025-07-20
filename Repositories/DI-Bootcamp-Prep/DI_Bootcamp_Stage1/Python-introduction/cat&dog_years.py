human_years = int(input("How many years ago did you get the cat and the dog?"))
if human_years ==1:
    cat_years = 15
    dog_years = 15
elif human_years == 2:
    cat_years = 15 + 9
    dog_years = 15 + 9
else:
    cat_years = 15 + 9 + 4 *(human_years)
    dog_years = 15 + 9 + 5 * (human_years)
print(cat_years)
print(dog_years)