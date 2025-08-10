import json
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
my_family = {
    "parents":["Beth","Jerry"],
    "children": ["Summer","Morty"]
}

# with open(f"{dir_path}/family.json","w") as f:
#     json.dump(my_family, f)

json_my_family_string = json.dumps(my_family)
# print(json_my_family_string)

#convert from a json file to a dict
with open(f"{dir_path}/family.json","r") as f:
    my_family2 = json.load(f)

print(my_family2)

parsed_family = json.loads(json_my_family_string)
print(type(parsed_family))