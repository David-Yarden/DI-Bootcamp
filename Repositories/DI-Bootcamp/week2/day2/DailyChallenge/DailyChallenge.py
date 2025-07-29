MATRIX_STR = '''
7ii
Tsx
h%?
i #
sM 
$a 
#t%'''

rows = [line for line in MATRIX_STR.splitlines() if line.strip()]
matrix = list(zip(*rows))  # transpose rows to columns

decoded_message = ""
in_symbol_group = False

for col in matrix:
    for char in col:
        if char.isalpha():
            if in_symbol_group:
                decoded_message += " "
                in_symbol_group = False
            decoded_message += char
        else:
            if decoded_message:
                in_symbol_group = True

print(decoded_message)
