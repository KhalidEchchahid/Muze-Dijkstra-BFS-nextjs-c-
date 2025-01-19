import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PathfinderStatsProps {
  visitedCells: number
  pathLength: number
  executionTime: number
}

export const PathfinderStats: React.FC<PathfinderStatsProps> = ({
  visitedCells,
  pathLength,
  executionTime,
}) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Algorithm Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Cells Visited</p>
            <p className="text-2xl font-bold">{visitedCells}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Path Length</p>
            <p className="text-2xl font-bold">{pathLength}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-medium">Execution Time</p>
            <p className="text-2xl font-bold">{executionTime.toFixed(2)} ms</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

