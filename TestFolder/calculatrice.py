#FONCTIONS
#JE COMMENCE PAR def
#JE NOUBLIE PAS LES PARENTHESES A LA FIN ET :

print("CALCULATRICE A FONCTIONS")

def addition(a, b):
    return a + b

def soustraction(a, b):
    return a - b

def multiplication(a, b):
    return a * b

def division(a, b):
    if b != 0 :
        return a / b
    else :
        return "Erreur ! Division par zéro impossible"

a = float(input("Entrer la valeur de a :"))
b = float(input("Entrer la valeur de b :"))

print("Choisis l'opération que tu veux")
print("1. Addition")
print("2. Soustraction")
print("3. Multiplication")
print("4. Division")

choix = input("Quel est ton choix ? 1, 2, 3 ou 4 ?")

if choix == "1" :
    print(f" {a} + {b} = {addition(a, b)}") #APPEL DE LA FONCTION
elif choix == "2" :
    print(f" {a} - {b} = {soustraction(a, b)}")
elif choix == "3" :
    print(f" {a} * {b} = {multiplication(a, b)}")
elif choix == "4" :
    print(f" {a} / {b} = {division(a, b)}")
else :
    print("Choix invalide, veuillez choisir entre 1, 2, 3 et 4")