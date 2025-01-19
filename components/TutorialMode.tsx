import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const tutorialSteps = [
  {
    title: "Welcome to Pathfinding Visualizer",
    description: "This tutorial will guide you through the basic features of the application."
  },
  {
    title: "Setting Start and End Points",
    description: "Click on the grid to set the start (green) and end (red) points for your path."
  },
  {
    title: "Creating Walls",
    description: "Click and drag on the grid to create walls that the algorithm must navigate around."
  },
  {
    title: "Choosing an Algorithm",
    description: "Select an algorithm from the dropdown menu. Each algorithm has its own strengths and weaknesses."
  },
  {
    title: "Visualizing the Algorithm",
    description: "Click the 'Visualize' button to see the algorithm in action. Watch as it explores the grid and finds the shortest path!"
  },
  {
    title: "Adjusting Speed",
    description: "Use the speed slider to control how fast the algorithm visualization runs."
  },
  {
    title: "Generating Mazes",
    description: "Click the 'Generate Maze' button to create a random maze for the algorithm to solve."
  },
  {
    title: "You're Ready!",
    description: "Now you know the basics. Feel free to explore and experiment with different scenarios and algorithms!"
  }
]

export const TutorialMode: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const startTutorial = () => {
    setIsOpen(true)
    setCurrentStep(0)
  }

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsOpen(false)
    }
  }

  return (
    <>
      <Button variant="outline" onClick={startTutorial}>Start Tutorial</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tutorialSteps[currentStep].title}</DialogTitle>
            <DialogDescription>
              {tutorialSteps[currentStep].description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={nextStep}>
              {currentStep < tutorialSteps.length - 1 ? "Next" : "Finish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

