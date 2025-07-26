# -----------------------
# Exercise 1
# -----------------------
keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]
numbers_dict = dict(zip(keys,values))
print(numbers_dict)
# -----------------------
# Exercise 2
# -----------------------
family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
total_cost = 0
for age in family.values():
    if age < 3:
        ticket_price = 0
        total_cost = total_cost + ticket_price
    elif 3 <age< 13:
        ticket_price = 10
        total_cost = total_cost + ticket_price
    else:
        ticket_price = 15
        total_cost = total_cost + ticket_price
print(f"The total cost for the movie is {total_cost}")

# -----------------------
# Exercise 3
# -----------------------
brand_dict = {
"name": "Zara",
"creation_date": 1975,
"creator_name": ["Amancio", "Ortega", "Gaona"],
"type_of_clothes": ["men", "women", "children", "home"],
"international_competitors": ["Gap", "H&M", "Benetton"],
"number_stores": 7000,
"major_color" : {
    "France": "blue", 
    "Spain": "red", 
    "US": {"pink", "green"}}}
brand_dict["number_stores"] = 2
print(f"Zara's clients can buy different types of clothes such as clothes for: {', '.join(brand_dict['type_of_clothes'])}")
brand_dict.update(country_creation="Spain")
if "international_competitors" in brand_dict:
    brand_dict["international_competitors"].append("Desigual")
brand_dict.pop("creation_date")
print(brand_dict["international_competitors"][-1])
print(brand_dict["major_color"]["US"])
print(len(brand_dict))
print(brand_dict.keys())
more_on_zara = {
    "creation_date": 1980,
    "number_stores": 9000
}
brand_dict.update(more_on_zara)
print(brand_dict)
# -----------------------
# Exercise 4
# -----------------------
users = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]
indices = [0, 1, 2, 3, 4]
merged_dict_1= dict(zip(users, indices))
print(merged_dict_1)
merged_dict_2 = dict(zip(indices, users))
print(merged_dict_2)
merged_dict_3 = dict(zip(sorted(users), indices))
print(merged_dict_3)
