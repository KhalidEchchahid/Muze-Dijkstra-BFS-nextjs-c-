import { exec } from 'child_process'
import { promisify } from 'util'
import * as fs from 'fs/promises'

const execAsync = promisify(exec)

async function testPathfinder() {
  const testInput = JSON.stringify({
    grid: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]
    ],
    start: { row: 0, col: 0 },
    end: { row: 2, col: 2 },
    algorithm: "dijkstra"
  })

  try {
    await fs.writeFile('test_input.json', testInput)
    const { stdout, stderr } = await execAsync('Muze-bakcend.exe < test_input.json')
    await fs.unlink('test_input.json')

    if (stderr) {
      console.error('C++ executable error:', stderr)
    } else {
      console.log('C++ executable output:', stdout)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

testPathfinder()

