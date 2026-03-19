import random


class Card:
    suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
    values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

    def __init__(self, suit, value):
        self.suit = suit
        self.value = value

    def __repr__(self):
        return f"{self.value} of {self.suit}"


class Deck:
    def __init__(self):
        self.shuffle()

    def shuffle(self):
        self.cards = [Card(suit, value) for suit in Card.suits for value in Card.values]
        random.shuffle(self.cards)
        print("Deck shuffled. 52 cards ready.")

    def deal(self):
        if not self.cards:
            print("No cards left in the deck!")
            return None
        card = self.cards.pop()
        return card


if __name__ == "__main__":
    deck = Deck()
    print(f"Cards remaining: {len(deck.cards)}")

    print("\nDealing 5 cards:")
    for _ in range(5):
        print(deck.deal())

    print(f"\nCards remaining: {len(deck.cards)}")

    print("\nReshuffling...")
    deck.shuffle()
    print(f"Cards remaining: {len(deck.cards)}")
