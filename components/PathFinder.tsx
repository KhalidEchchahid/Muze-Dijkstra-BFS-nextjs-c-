"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Cell, CellState, Algorithm } from "@/types/pathfinder";
import { generateMaze } from "@/utils/mazeGenerator";
import { PathfinderControls } from "./PathFinderControls";
import { PathfinderGrid } from "./PathFinderGrid";
import { PathfinderStats } from "./PathFinderStats";

const GRID_SIZE = 20;
const CELL_SIZE = 30;

export function PathFinder() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [startCell, setStartCell] = useState<Cell | null>(null);
  const [endCell, setEndCell] = useState<Cell | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState<Algorithm>("dijkstra");
  const [error, setError] = useState<string | null>(null);
  const [speed, setSpeed] = useState(5);
  const [stats, setStats] = useState({
    visitedCells: 0,
    pathLength: 0,
    executionTime: 0,
  });
  // const [isDarkMode, setIsDarkMode] = useState(false);

  const initializeGrid = useCallback(() => {
    const newGrid: Cell[][] = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      const currentRow: Cell[] = [];
      for (let col = 0; col < GRID_SIZE; col++) {
        currentRow.push({ row, col, state: CellState.EMPTY });
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
    setStartCell(null);
    setEndCell(null);
    setStats({ visitedCells: 0, pathLength: 0, executionTime: 0 });
  }, []);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  const handleMouseDown = (row: number, col: number) => {
    if (isRunning) return;
    setIsMousePressed(true);
    updateCellState(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isRunning) return;
    if (isMousePressed) {
      updateCellState(row, col);
    }
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  const updateCellState = (row: number, col: number) => {
    const newGrid = [...grid];
    const cell = newGrid[row][col];

    if (!startCell && cell.state !== CellState.END) {
      cell.state = CellState.START;
      setStartCell(cell);
    } else if (!endCell && cell.state !== CellState.START) {
      cell.state = CellState.END;
      setEndCell(cell);
    } else if (cell.state === CellState.EMPTY) {
      cell.state = CellState.WALL;
    } else if (cell.state === CellState.WALL) {
      cell.state = CellState.EMPTY;
    }

    setGrid(newGrid);
  };

  const visualizeAlgorithm = async () => {
    setError(null);
    if (!startCell || !endCell) {
      alert("Please set both start and end points");
      return;
    }

    setIsRunning(true);
    const startTime = performance.now();

    try {
      const response = await fetch("/api/pathfind", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grid: grid.map((row) => row.map((cell) => cell.state)),
          start: { row: startCell.row, col: startCell.col },
          end: { row: endCell.row, col: endCell.col },
          algorithm,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch path");
      }

      const data = await response.json();
      console.log("Received data:", data);
      if (data.error) {
        throw new Error(data.error);
      }
      const endTime = performance.now();
      setStats({
        visitedCells: data.visited.length,
        pathLength: data.path.length,
        executionTime: endTime - startTime,
      });
      await animatePath(data.visited, data.path);
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsRunning(false);
    }
  };

  const animatePath = async (visited: number[][], path: number[][]) => {
    const delay = 100 / speed;
    // Animate visited cells
    for (const [row, col] of visited) {
      if (
        grid[row][col].state !== CellState.START &&
        grid[row][col].state !== CellState.END
      ) {
        setGrid((prev) => {
          const newGrid = JSON.parse(JSON.stringify(prev));
          newGrid[row][col].state = CellState.VISITED;
          return newGrid;
        });
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    // Animate path
    for (const [row, col] of path) {
      if (
        grid[row][col].state !== CellState.START &&
        grid[row][col].state !== CellState.END
      ) {
        setGrid((prev) => {
          const newGrid = JSON.parse(JSON.stringify(prev));
          newGrid[row][col].state = CellState.PATH;
          return newGrid;
        });
        await new Promise((resolve) => setTimeout(resolve, delay * 2));
      }
    }
  };

  const getCellColor = (state: CellState) => {
    switch (state) {
      case CellState.WALL:
        return "bg-gray-800 dark:bg-gray-200";
      case CellState.START:
        return "bg-green-500";
      case CellState.END:
        return "bg-red-500";
      case CellState.VISITED:
        return "bg-blue-300 dark:bg-blue-700";
      case CellState.PATH:
        return "bg-yellow-400";
      default:
        return "bg-white dark:bg-gray-600";
    }
  };

  // const toggleTheme = () => {
  //   setIsDarkMode(!isDarkMode)
  // }

  const generateRandomMaze = () => {
    const newGrid = generateMaze(grid);
    setGrid(newGrid);
    setStartCell(null);
    setEndCell(null);
  };

  return (
    <div className={`flex flex-col items-center`}>
      <PathfinderControls
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        visualizeAlgorithm={visualizeAlgorithm}
        clearGrid={initializeGrid}
        generateRandomMaze={generateRandomMaze}
        isRunning={isRunning}
        speed={speed}
        setSpeed={setSpeed}
        // toggleTheme={toggleTheme}
        // isDarkMode={isDarkMode}
      />
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col lg:flex-row items-start gap-4 w-full max-w-7xl">
        <div className="w-full lg:w-3/4">
          <PathfinderGrid
            grid={grid}
            onCellClick={handleMouseDown}
            onCellEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
            getCellColor={getCellColor}
            cellSize={CELL_SIZE}
          />
        </div>
        <div className="w-full lg:w-1/4">
          <PathfinderStats {...stats} />
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p>
          Click to add start (green) and end (red) points, then click and drag
          to add walls.
        </p>
        <p>
          Select an algorithm and click Visualize to see the pathfinding in
          action!
        </p>
      </div>
    </div>
  );
}
