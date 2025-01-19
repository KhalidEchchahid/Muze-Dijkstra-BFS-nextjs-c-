import React, { useState } from 'react'
import { PathFinder } from './PathFinder'
import { Algorithm } from '@/types/pathfinder'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export const AlgorithmComparison: React.FC = () => {
  const [algorithm1, setAlgorithm1] = useState<Algorithm>('dijkstra')
  const [algorithm2, setAlgorithm2] = useState<Algorithm>('bfs')
  const [isComparing, setIsComparing] = useState(false)

  const startComparison = () => {
    setIsComparing(true)
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <Select value={algorithm1} onValueChange={(value: Algorithm) => setAlgorithm1(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select algorithm 1" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dijkstra">Dijkstra s Algorithm</SelectItem>
            <SelectItem value="bfs">Breadth-First Search</SelectItem>
          </SelectContent>
        </Select>
        <Select value={algorithm2} onValueChange={(value: Algorithm) => setAlgorithm2(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select algorithm 2" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dijkstra">Dijkstra s Algorithm</SelectItem>
            <SelectItem value="bfs">Breadth-First Search</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={startComparison}>Start Comparison</Button>
      </div>
      {isComparing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PathFinder key={`${algorithm1}-${isComparing}`}  />
          <PathFinder key={`${algorithm2}-${isComparing}`}  />
        </div>
      )}
    </div>
  )
}

