# -----------------------
# Exercise 1
# -----------------------
print("Hello World\n"*5 + "I love python \n"*5)
# -----------------------
# Exercise 2
# -----------------------
month = int(input("input a month from 1 to 12: "))
if month > 12:
    print("This is not a correct month")
elif 3<= month <=5:
    print("The season is Spring")
elif 6<= month <=8:
    print("The season is Summer")
elif 9<= month <=1:
    print("The season is Autumn")
else:
    print("The season is Winter")
