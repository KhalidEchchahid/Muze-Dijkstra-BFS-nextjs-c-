import { Cell, CellState } from '@/types/pathfinder'

export function generateMaze(grid: Cell[][]): Cell[][] {
  const newGrid = grid.map(row => row.map(cell => ({ ...cell, state: CellState.WALL })))
  const stack: [number, number][] = [[1, 1]]
  newGrid[1][1].state = CellState.EMPTY

  while (stack.length > 0) {
    const [row, col] = stack[stack.length - 1]
    const neighbors = [
      [row - 2, col],
      [row + 2, col],
      [row, col - 2],
      [row, col + 2]
    ].filter(([r, c]) => r > 0 && r < newGrid.length - 1 && c > 0 && c < newGrid[0].length - 1)

    const unvisitedNeighbors = neighbors.filter(([r, c]) => newGrid[r][c].state === CellState.WALL)

    if (unvisitedNeighbors.length > 0) {
      const [nextRow, nextCol] = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)]
      newGrid[nextRow][nextCol].state = CellState.EMPTY
      newGrid[(row + nextRow) / 2][(col + nextCol) / 2].state = CellState.EMPTY
      stack.push([nextRow, nextCol])
    } else {
      stack.pop()
    }
  }

  return newGrid
}

