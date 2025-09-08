import random

# Step 1: Gene class
class Gene:
    def __init__(self):
        self.value = random.randint(0, 1)

    def mutate(self):
        self.value = 1 - self.value  # Flip 0 to 1 or 1 to 0

    def __repr__(self):
        return str(self.value)

# Step 2: Chromosome class (contains 10 Genes)
class Chromosome:
    def __init__(self):
        self.genes = [Gene() for _ in range(10)]

    def mutate(self):
        for gene in self.genes:
            if random.random() < 0.5:
                gene.mutate()

    def is_all_ones(self):
        return all(gene.value == 1 for gene in self.genes)

    def __repr__(self):
        return ''.join(str(g) for g in self.genes)

# Step 3: DNA class (contains 10 Chromosomes)
class DNA:
    def __init__(self):
        self.chromosomes = [Chromosome() for _ in range(10)]

    def mutate(self):
        for chromosome in self.chromosomes:
            chromosome.mutate()

    def is_all_ones(self):
        return all(chromosome.is_all_ones() for chromosome in self.chromosomes)

    def __repr__(self):
        return '\n'.join(str(c) for c in self.chromosomes)

# Step 4: Organism class
class Organism:
    def __init__(self, dna, environment):
        self.dna = dna
        self.environment = environment  # Probability of mutation per generation

    def attempt_mutation(self):
        if random.random() < self.environment:
            self.dna.mutate()

# Step 5: Simulation
def simulate_evolution(environment_prob=0.9):
    dna = DNA()
    organism = Organism(dna, environment_prob)
    generations = 0

    while not organism.dna.is_all_ones():
        organism.attempt_mutation()
        generations += 1

    return generations, organism.dna

# Run the simulation
generations_needed, final_dna = simulate_evolution()

# Print results
print(f"\n✅ DNA made of all 1s reached in {generations_needed} generations!\n")
print("Final DNA structure:")
print(final_dna)
