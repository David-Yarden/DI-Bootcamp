import random

list_of_numbers = [random.randint(0, 10000) for _ in range(20000)]
list_of_numbers2 = list_of_numbers.copy()
target_number = 3728

def pairs(list1, list2):
    printed = set()  # to avoid duplicate pairs
    for num1 in list1:
        for num2 in list2:
            if num1 + num2 == target_number:
                pair = tuple(sorted((num1, num2)))
                if pair not in printed:
                    print(f"{num1} and {num2} sums to the target_number {target_number}")
                    printed.add(pair)

pairs(list_of_numbers, list_of_numbers2)
