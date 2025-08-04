while True:
    try:
        move = int(input("Give ur move from 1 - 9: "))
        if move < 1 or move > 9:
            raise Exception("Choose a number in range 1 - 9: ")
        print("Succesful input")
        break
    except Exception as e:
        print(e)
        continue
    finally :
        print("finally mesasge")