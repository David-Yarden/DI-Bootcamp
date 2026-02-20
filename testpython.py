class AgeGuessingGame:
    def __init__(self,monAge,nombreDessai):
            self.monAge = monAge
            monVraiAge= int(self.monAge, 2)
    def jouer(self):
            self.nombreDessai = self.nombreDessai
            while self.nombreDessai > 0:
                age_devine = int(input("Devine mon age: "))
                if age_devine > monVraiAge:
                    print("C'est moins")
                    self.nombreDessai -= 1
                elif age_devine < monVraiAge:
                    print("C'est plus")
                    self.nombreDessai -= 1
                else:
                    print("Bravo, tu as deviné mon age")
                    break
            if self.nombreDessai == 0:
                print("Désolé, tu as épuisé tes essais. Mon age est", monVraiAge)

game = AgeGuessingGame("11111", 5)
game.jouer()