'use client'

import { useState } from 'react'
import { PathFinder } from '@/components/PathFinder'
import { Navbar } from '@/components/Navbar'
import { AlgorithmComparison } from '@/components/AlgorithmComparision'
import { ModeSelector } from '@/components/ModeSelector'

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mode, setMode] = useState<'single' | 'comparison'>('single')

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 p-4">
        <ModeSelector mode={mode} setMode={setMode} />
        <div className="w-full max-w-7xl mx-auto">
          {mode === 'single' ? (
            <PathFinder />
          ) : (
            <AlgorithmComparison />
          )}
        </div>
      </div>
    </div>
  )
}

