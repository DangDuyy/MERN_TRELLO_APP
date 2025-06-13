import { useColorScheme, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const theme = useTheme()

  if (!mode) return null

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" color="primary">
        Mode:
      </Typography>
      <Select
        size="small"
        value={mode}
        onChange={e => setMode(e.target.value)}
      >
        <MenuItem value="system">System</MenuItem>
        <MenuItem value="light">Light</MenuItem>
        <MenuItem value="dark">Dark</MenuItem>
      </Select>
    </Box>
  )
}

export default ModeSelect