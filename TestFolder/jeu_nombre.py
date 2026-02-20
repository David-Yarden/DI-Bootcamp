import random

secret = random.randint(1, 10)
print("Devine le nombre entre 1 et 10 !") 

guess = int(input("Ton choix : "))

if guess == secret:
    print("Bravo tu as trouvé !")
else:
    print(f"Perdu le nombre était {secret}")
