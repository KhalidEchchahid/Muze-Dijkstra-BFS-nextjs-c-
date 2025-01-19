import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Algorithm } from '@/types/pathfinder'

interface PathfinderControlsProps {
  algorithm: Algorithm
  setAlgorithm: (value: Algorithm) => void
  visualizeAlgorithm: () => void
  clearGrid: () => void
  isRunning: boolean
  speed: number
  setSpeed: (value: number) => void
  generateRandomMaze: () => void
}

export const PathfinderControls: React.FC<PathfinderControlsProps> = ({
  algorithm,
  setAlgorithm,
  visualizeAlgorithm,
  clearGrid,
  isRunning,
  speed,
  setSpeed,
  generateRandomMaze,
}) => {
  return (
    <div className="mb-4 space-y-4">
      <div className="flex flex-wrap gap-4 items-center space-x-2">
        <Select value={algorithm} onValueChange={(value: Algorithm) => setAlgorithm(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dijkstra">Dijkstra s Algorithm</SelectItem>
            <SelectItem value="bfs">Breadth-First Search</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={visualizeAlgorithm} disabled={isRunning}>
          Visualize {algorithm === 'dijkstra' ? "Dijkstra's" : 'BFS'} Algorithm
        </Button>
        <Button variant="secondary" onClick={clearGrid} disabled={isRunning}>
          Clear Grid
        </Button>
        <Button variant="secondary" onClick={generateRandomMaze} disabled={isRunning}>
          Generate Maze
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm">Speed:</span>
        <Slider
          min={1}
          max={10}
          step={1}
          value={[speed]}
          onValueChange={(value) => setSpeed(value[0])}
          className="w-[200px]"
        />
        <span className="text-sm">{speed}x</span>
      </div>
    </div>
  )
}

