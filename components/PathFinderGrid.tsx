import React from 'react'
import { motion } from 'framer-motion'
import { Cell, CellState } from '@/types/pathfinder'

interface PathfinderGridProps {
  grid: Cell[][]
  onCellClick: (row: number, col: number) => void
  onCellEnter: (row: number, col: number) => void
  onMouseUp: () => void
  getCellColor: (state: CellState) => string
  cellSize: number
}

export const PathfinderGrid: React.FC<PathfinderGridProps> = ({
  grid,
  onCellClick,
  onCellEnter,
  onMouseUp,
  getCellColor,
  cellSize,
}) => {
  return (
    <div className="overflow-auto max-w-full max-h-[70vh] md:max-h-full rounded-lg shadow-lg">
      <div
        className="grid gap-1 p-4 bg-gray-200 dark:bg-gray-800"
        style={{
          gridTemplateColumns: `repeat(${grid.length}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${grid.length}, ${cellSize}px)`,
          width: `${grid.length * cellSize}px`,
          height: `${grid.length * cellSize}px`,
        }}
        onMouseLeave={onMouseUp}
      >
        {grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <motion.div
              key={`${rowIdx}-${colIdx}`}
              className={`${getCellColor(cell.state)} rounded-sm`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              onMouseDown={() => onCellClick(rowIdx, colIdx)}
              onMouseEnter={() => onCellEnter(rowIdx, colIdx)}
              onMouseUp={onMouseUp}
            />
          ))
        )}
      </div>
    </div>
  )
}

