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
name: Zara,
creation_date: 1975,
creator_name: [Amancio, Ortega, Gaona],
type_of_clothes: [men, women, children, home],
international_competitors: [Gap, H&M, Benetton],
number_stores: 7000,
major_color : {
    France: blue, 
    Spain: red, 
    US: {pink, green}}}
print(brand_dict)
# -----------------------
# Exercise 4
# -----------------------
