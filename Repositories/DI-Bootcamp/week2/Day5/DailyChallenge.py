class Farm :
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}
    def add_animal(self, animal_type, count = 1):
        if animal_type in self.animals:
            self.animals[animal_type] += count
        else:
            self.animals[animal_type] = count
    def get_info(self):
        result = f"{self.name}'s farm\n\n"
        for animal, count in self.animals.items():
            result += f"{animal} : {count}\n"
        result += "\n    E-I-E-I-0!"
        return result

    def get_animal_types(self):
        return sorted(self.animals.keys())

    def get_short_info(self):
        animal_types = self.get_animal_types()
        formatted_animals = []

        for animal in animal_types:
            count = self.animals[animal]
            if count > 1:
                formatted_animals.append(animal + 's')
            else:
                formatted_animals.append(animal)

        if len(formatted_animals) > 1:
           
            short_info = f"{self.name}'s farm has {', '.join(formatted_animals[:-1])} and {formatted_animals[-1]}."
        else:
            short_info = f"{self.name}'s farm has {formatted_animals[0]}."

        return short_info
    
macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
macdonald.add_animal('goat', 12)
print(macdonald.get_info())