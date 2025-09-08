# -----------------------
# Challenge 1
# -----------------------
word = input("Type a word: ")
dict = {}
for index, char in enumerate(word):
    if char in dict:
        dict[char].append(index)
    else:
        dict[char] = [index]
print(dict)
# -----------------------
# Challenge 2
# -----------------------
items_purchase = {"Water": "$1", "Bread": "$3", "TV": "$1,000", "Fertilizer": "$20"}
wallet = "$300"
wallet_amount = int(wallet.replace("$", ""))
items_purchase = {item: int(price.replace("$", "").replace(",", "")) 
                  for item, price in items_purchase.items()}
print(sorted([item for item, price in items_purchase.items() if price <= wallet_amount]) or "Nothing")