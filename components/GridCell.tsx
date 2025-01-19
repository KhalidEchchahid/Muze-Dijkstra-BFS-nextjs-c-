import React from 'react'

interface GridCellProps {
  state: number
  isPath: boolean
  isVisited: boolean
}

export const GridCell: React.FC<GridCellProps> = ({ state, isPath, isVisited }) => {
  let backgroundColor = 'bg-white'
  const borderColor = 'border-gray-200'

  if (state === 1) {
    backgroundColor = 'bg-gray-800'
  } else if (state === 2) {
    backgroundColor = 'bg-green-500'
  } else if (state === 3) {
    backgroundColor = 'bg-red-500'
  } else if (isPath) {
    backgroundColor = 'bg-yellow-400'
  } else if (isVisited) {
    backgroundColor = 'bg-blue-200'
  }

  return (
    <div
      className={`w-6 h-6 border ${borderColor} ${backgroundColor}`}
      role="gridcell"
      aria-label={`${state === 2 ? 'Start' : state === 3 ? 'End' : isPath ? 'Path' : isVisited ? 'Visited' : 'Empty'} cell`}
    />
  )
}

