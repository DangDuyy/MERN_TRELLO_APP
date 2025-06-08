import Container from '@mui/material/Container'
import { useColorScheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
function ModeSwitcher() {
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

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor:'primary.main'}}>
      <Box sx={{
        backgroundColor: 'primary.light',
        width:'100%',
        height: (theme) => theme.trello.appBarHeight, // Đổi sang custom
        display: 'flex',
        alignItems: 'center'
      }}>
        <ModeSwitcher/>
      </Box>
      <Box sx={{
        backgroundColor: 'primary.dark',
        width:'100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Bar
      </Box>
      <Box sx={{
        backgroundColor: 'primary.main',
        width:'100%',
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Content
      </Box>
    </Container>
  )
}

export default App