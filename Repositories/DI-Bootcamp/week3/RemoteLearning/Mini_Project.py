class Human:
    def __init__(self, id_number, name, age, priority, blood_type, family=None):
        self.id_number = id_number
        self.name = name
        self.age = age
        self.priority = priority
        self.blood_type = blood_type
        self.family = family if family else []

    def add_family_member(self, human):
        if isinstance(human, Human):
            self.family.append(human)
        else:
            raise TypeError("Family member must be a Human")

class Queue:
    def __init__(self):
        self.queue = []

    def add_person(self, person):
        if isinstance(person, Human):
            self.queue.append(person)
        else:
            raise TypeError("Person must be a Human")

    def find_in_queue(self, person_id):
        for person in self.queue:
            if person.id_number == person_id:
                return person
        return None

    def swap(self, person1, person2):
        idx1, idx2 = self.queue.index(person1), self.queue.index(person2)
        self.queue[idx1], self.queue[idx2] = self.queue[idx2], self.queue[idx1]

    def get_next(self):
        return self.queue.pop(0) if self.queue else None

    def get_next_blood_type(self, blood_type):
        for i, person in enumerate(self.queue):
            if person.blood_type == blood_type:
                return self.queue.pop(i)
        return None

    def sort_by_age(self):
        self.queue.sort(key=lambda x: x.age)

    def rearrange_queue(self):
        self.queue.sort(key=lambda x: (not x.priority, x.age))

# Example usage
h1 = Human("001", "Alice", 30, False, "A")
h2 = Human("002", "Bob", 45, True, "B")
h3 = Human("003", "Charlie", 25, False, "A")
h4 = Human("004", "Diana", 60, True, "O")

# Adding family relationships
h1.add_family_member(h3)  # Charlie is Alice's family
h2.add_family_member(h4)  # Diana is Bob's family

queue = Queue()
queue.add_person(h1)
queue.add_person(h2)
queue.add_person(h3)
queue.add_person(h4)

print("Initial queue:", [p.name for p in queue.queue])
queue.rearrange_queue()
print("After rearranging:", [p.name for p in queue.queue])
print("Next person:", queue.get_next().name)
print("Next with blood type A:", queue.get_next_blood_type("A").name)
print("Remaining queue:", [p.name for p in queue.queue])
