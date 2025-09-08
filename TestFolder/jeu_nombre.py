import random

# Petit jeu de devinette
secret = random.randint(1, 10)
print("Devine le nombre entre 1 et 10 !") #on affiche le message d'instruction

guess = int(input("Ton choix : "))#le joueur entre son choix

if guess == secret: #si le joueur a trouvé
    print("Bravo tu as trouvé !") #alors on affiche un message de félicitation
else:
    print(f"Perdu le nombre était {secret}") #sinon on affiche le nombre à trouver
