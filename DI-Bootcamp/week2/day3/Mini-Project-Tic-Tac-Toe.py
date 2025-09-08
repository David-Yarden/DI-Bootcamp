def display_board(board):
    for row in board:
        print(" | ".join(row))

def player_input(board, player):
    while True:
        try:
            position = int(input(f"Player {player}, choose a position between 1 and 9: "))
            if position < 1 or position > 9:
                print("Invalid position! Choose a number 1-9.")
                continue
            row = (position - 1) // 3
            col = (position - 1) % 3
            if board[row][col] == "_":
                board[row][col] = player
                break
            else:
                print("Cell already taken, choose another one.")
        except ValueError:
            print("Please enter a valid integer.")

def check_win(board, player):
    for row in board:  # rows
        if all(cell == player for cell in row):
            return True
    for col in range(3):  # columns
        if all(board[row][col] == player for row in range(3)):
            return True
    if all(board[i][i] == player for i in range(3)):  # diagonal
        return True
    if all(board[i][2 - i] == player for i in range(3)):  # diagonal
        return True
    return False

def check_tie(board):
    return all(cell != "_" for row in board for cell in row)

def play():
    board = [["_", "_", "_"],
             ["_", "_", "_"],
             ["_", "_", "_"]]
    current_player = "X"

    while True:
        display_board(board)
        print()  # spacing
        player_input(board, current_player)

        if check_win(board, current_player):
            display_board(board)
            print(f"Player {current_player} wins!")
            break

        if check_tie(board):
            display_board(board)
            print("It's a tie!")
            break

        # switch player
        current_player = "O" if current_player == "X" else "X"
        print("\n" + "-" * 15 + "\n")  # separator between turns

play()
