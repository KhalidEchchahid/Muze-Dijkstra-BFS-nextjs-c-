import React from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { TutorialMode } from './TutorialMode'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface NavbarProps {
  toggleTheme: () => void
  isDarkMode: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode }) => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pathfinding Visualizer</h1>
      <div className="flex items-center space-x-4">
        <div className="hidden md:block">
          <TutorialMode />
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Tutorial</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Tutorial</SheetTitle>
                <SheetDescription>
                  Learn how to use the Pathfinding Visualizer
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <TutorialMode />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {isDarkMode ? <SunIcon className="h-[1.2rem] w-[1.2rem]" /> : <MoonIcon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </div>
    </nav>
  )
}

