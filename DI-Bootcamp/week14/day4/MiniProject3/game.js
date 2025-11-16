export class Game {
  constructor(player1, player2) {
    this.size = 10
    this.grid = Array(this.size).fill(null).map(() => Array(this.size).fill(null))
    this.players = { [player1]: { x: 0, y: 0 }, [player2]: { x: 9, y: 9 } }
    this.bases = { [player1]: { x: 0, y: 0 }, [player2]: { x: 9, y: 9 } }
    this.currentTurn = player1
    this.winner = null
    this.grid[0][0] = player1
    this.grid[9][9] = player2
  }

  makeMove(player, dir) {
    if (this.winner) throw new Error("Game over")
    if (player !== this.currentTurn) throw new Error("Not your turn")
    const moves = { up:[-1,0], down:[1,0], left:[0,-1], right:[0,1] }
    const move = moves[dir]
    if (!move) throw new Error("Invalid direction")
    const pos = this.players[player]
    const nx = pos.x + move[0]
    const ny = pos.y + move[1]
    if (nx < 0 || nx >= this.size || ny < 0 || ny >= this.size) throw new Error("Move out of bounds")
    const otherPlayer = Object.keys(this.players).find(p => p !== player)
    if (this.bases[otherPlayer].x === nx && this.bases[otherPlayer].y === ny) {
      this.winner = player
    }
    this.grid[pos.x][pos.y] = null
    this.grid[nx][ny] = player
    pos.x = nx
    pos.y = ny
    this.currentTurn = otherPlayer
    return { grid: this.grid, currentTurn: this.currentTurn, winner: this.winner }
  }
}
