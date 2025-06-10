import React from 'react'
import { useColorScheme } from '@mui/material/styles'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  if (!mode) return null

  return (
   <div>
    Mode:
     <select
      value={mode}
      onChange={e => setMode(e.target.value)}
      style={{ marginBottom: 16 }}
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
   </div>
  )
}

export default ModeSelect
