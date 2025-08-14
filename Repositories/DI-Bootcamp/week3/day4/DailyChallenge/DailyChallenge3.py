data = []
count = 0

while count < 5:
    name = input("Input a name: ")
    age = int(input("Input the age: "))
    score = int(input("Input the score: "))

    data.append((name,age,score))
    count +=1

    sorted_data = sorted(data, key=lambda item: (item[0], item[1], item[2]))
    print(sorted_data)
