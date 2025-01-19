export enum CellState {
    EMPTY,
    WALL,
    START,
    END,
    VISITED,
    PATH
  }
  
  export interface Cell {
    row: number
    col: number
    state: CellState
  }
  
  export type Algorithm = 'dijkstra' | 'bfs'
  
  