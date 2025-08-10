from game import Game

def get_user_menu_choice():
    print("\nMenu:")
    print("1. Play a new game")
    print("2. Show scores")
    print("3. Quit")

    choice = input("Choose an option: ").strip()
    while choice not in ['1', '2', '3']:
        print("Invalid choice. Please enter 1, 2, or 3.")
        choice = input("Choose an option: ").strip()
    return choice

def print_results(results):
    print("\nGame Results Summary:")
    # Calculate totals
    total_wins = sum(r['win'] for r in results)
    total_losses = sum(r['loss'] for r in results)
    total_draws = sum(r['draw'] for r in results)

    print(f"Wins: {total_wins}")
    print(f"Losses: {total_losses}")
    print(f"Draws: {total_draws}")
    print("Thank you for playing!")

def main():
    game = Game()
    results = []

    while True:
        choice = get_user_menu_choice()

        if choice == "1":
            # Play a single game
            result = game.play()
            # Store results as dict with counts
            # Each play yields one of win/loss/draw, so count 1 for that and 0 for others
            results.append({
                'win': 1 if result == 'win' else 0,
                'loss': 1 if result == 'loss' else 0,
                'draw': 1 if result == 'draw' else 0
            })

        elif choice == "2":
            if not results:
                print("No games played yet.")
            else:
                print_results(results)

        elif choice == "3":
            print_results(results)
            break

if __name__ == "__main__":
    main()
