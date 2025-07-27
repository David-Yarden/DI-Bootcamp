# def hello():
#     print('hello there')
    
# hello()

# Passing arguments to the function

# def greetings_adv(language = "EN", name = "John"):
#     if language == "PT":
#         return f"Ola {name}, tudo bem?"
#     elif language == "ES":
#         return f"Hola {name}, que tal"
#     elif language == "EN":
#         return f"Hi {name}, how are you?"
#     else:
#         return "Unknown language"

# greetings_adv("PT", "David")

# def calculation(num1,num2):
    # result = num1 + num2
    # return result

# def multiply(calc):
#     result = calc * 5
#     return result

# calc = calculation(5,3)
# print(multiply(calc))

def country_info(country)-> str:
    # returns the capital of a given country
    if country == "Naboo":
        return "Theed"
    elif country == "France":
        return "Paris"
    elif country == "Israel":
        return "Jerusalem"
    else:
        return "Unknown country"

print(country_info(input("Chose a country: ")))



#Global and local scope

age = 25

def current_age():
    print(age)
    my_age = 35
    my_age += 1

my_age= 44
print(my_age)

current_age()

def happy_birthday():
   if age > 12
   print("You have bar mitsva")
   age += 1

happy_birthday()