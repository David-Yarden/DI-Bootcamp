board = [" "] * 9


def display_board():
    print()
    print(f" {board[0]} | {board[1]} | {board[2]} ")
    print("---+---+---")
    print(f" {board[3]} | {board[4]} | {board[5]} ")
    print("---+---+---")
    print(f" {board[6]} | {board[7]} | {board[8]} ")
    print()
    print(" 1 | 2 | 3 ")
    print("---+---+---")
    print(" 4 | 5 | 6 ")
    print("---+---+---")
    print(" 7 | 8 | 9 ")
    print()


def player_input(player):
    while True:
        try:
            position = int(input(f"Player {player}, choose a square (1-9): "))
            if position < 1 or position > 9:
                print("Please enter a number between 1 and 9.")
            elif board[position - 1] != " ":
                print("That square is already taken. Choose another.")
            else:
                return position - 1  # convert to 0-based index
        except ValueError:
            print("Invalid input. Please enter a number.")


def check_win():
    winning_combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  # rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  # columns
        [0, 4, 8], [2, 4, 6],             # diagonals
    ]
    for combo in winning_combinations:
        a, b, c = combo
        if board[a] == board[b] == board[c] and board[a] != " ":
            return board[a]  # return the winning mark
    return None


def is_draw():
    return " " not in board


def play():
    global board
    board = [" "] * 9
    current_player = "X"

    print("Welcome to Tic Tac Toe!")

    while True:
        display_board()
        index = player_input(current_player)
        board[index] = current_player

        winner = check_win()
        if winner:
            display_board()
            print(f"Player {winner} wins! Congratulations!")
            break

        if is_draw():
            display_board()
            print("It's a tie!")
            break

        current_player = "O" if current_player == "X" else "X"

    again = input("Play again? (y/n): ").strip().lower()
    if again == "y":
        play()
    else:
        print("Thanks for playing!")


play()
