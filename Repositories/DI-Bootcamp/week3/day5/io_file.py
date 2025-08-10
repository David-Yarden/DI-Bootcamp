import os
#Python I/O

#how to read a file

dir_path = os.path.dirname(os.path.realpath(__file__))

with open(f"{dir_path}\secrets.txt", "r", encoding="utf-8") as file_obj:
    file_content = file_obj.read()
    print(file_content)


#Star Wars Exercise

with open(f"{dir_path}\star_wars.txt", "r", encoding="utf-8") as f:
    txt_list = f.readlines()
    for line in txt_list:
        print(line)
print('end of document')
print(txt_list[0][:4])
[]
temp = []
for line in txt_list:
    temp.append(line.split())
print(temp)

counts = {"Darth":0, "Luke":0,"Lea":0}
for line in txt_list:
    line = line.strip()
    if line == "Darth":
        counts["Darth"] += 1
    elif line == "Luke":
        counts["Luke"] += 1
    elif line == "Lea":
        counts["Lea"] += 1
print(counts)

# with open(f"{dir_path}\star_wars.txt", "r", encoding="utf-8") as f:
#     f.seek(0, os.SEEK_END) #we make sure the cursor is in the end of the file
#     f.write("\nJuliana")
#     print("succesfully added")

# for i, name in enumerate(txt_list):
#     if name.strip() == "Luke":
#         txt_list[i] = f"{name} Skywalker"
# print("Sucessfully changed")#It's not working because we can't change the object file directly. You need to copy the content, change it and then overwrite the content you changed. bruh

modified_lines = []
for line in txt_list:
    if line.strip() == "Luke":
        modified_lines.append("Luke Skywalker\n")
    else:
        modified_lines.append(line)

with open(f"{dir_path}\star_wars.txt", "w", encoding="utf-8") as f:
    f.seek(0)
    f.writelines(modified_lines)
    