import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ModeSelectorProps {
  mode: 'single' | 'comparison'
  setMode: (mode: 'single' | 'comparison') => void
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, setMode }) => {
  return (
    <div className="w-full max-w-7xl mx-auto py-4">
      <Select value={mode} onValueChange={(value: 'single' | 'comparison') => setMode(value)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="single">Single Algorithm Mode</SelectItem>
          <SelectItem value="comparison">Algorithm Comparison Mode</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

