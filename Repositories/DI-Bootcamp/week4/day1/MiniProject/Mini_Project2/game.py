import random

class Game:
    def get_user_item(self):
        item = input("Enter an item (Rock, Paper, Scissors) to use in the game: ")
        while item.lower() not in ['rock', 'paper', 'scissors']:
            print("Invalid item. Please enter Rock, Paper, or Scissors.")
            item = input("Enter an item (Rock, Paper, Scissors) to use in the game: ")
        return item.lower()

    def get_computer_item(self):
        return random.choice(['rock', 'paper', 'scissors'])

    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "draw"
        elif (user_item == 'rock' and computer_item == 'scissors') or \
             (user_item == 'paper' and computer_item == 'rock') or \
             (user_item == 'scissors' and computer_item == 'paper'):
            return "win"
        else:
            return "loss"

    def play(self):
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)
        
        # Print output as per instructions
        if result == "win":
            outcome_msg = "You win!"
        elif result == "loss":
            outcome_msg = "You lose!"
        else:
            outcome_msg = "It's a draw!"

        print(f"You selected {user_item}. The computer selected {computer_item}. {outcome_msg}")
        
        return result
