// Boards List
import AppsIcon from '@mui/icons-material/Apps'
import Box from '@mui/material/Box'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import ModeSelect from '~/components/ModeSelect'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import WorkSpaces from './Menus/WorkSpaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import { Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Menus/Profile'

function AppBar() {
  return (
    <Box px={2} sx={{
    // backgroundColor: 'primary.light',
      backgroundColor: (theme) => theme.palette.background.paper,
      width:'100%',
      height: (theme) => theme.trello.appBarHeight, // Đổi sang custom
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Box sx={{ display: 'flex', alignItems:'center', gap:2 }}>
        <AppsIcon sx={{ color:'primary.main' }}/>
        <Box sx={{ display: 'flex', alignItems:'center', gap:0.5 }}>
          <SvgIcon component={TrelloIcon} fontSize='small' inheritViewBox sx={{ color: 'primary.main' }}/>
          <Typography variant='span'sx={{ fontSize:'1rem', fontWeight:'bold', color:'primary.main' }}>Trello</Typography>
        </Box>
        <WorkSpaces/>
        <Recent/>
        <Starred/>
        <Templates/>
        <Button variant="outlined">CREATE</Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems:'center', gap:2 }}>
        <TextField id="outlined-search" label="Search..." type="search" size="small"/>
        <ModeSelect/>
        <Tooltip title="Notifications">
          <Badge color="secondary" variant="dot" >
            <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ color: 'primary.main' }}/>
        </Tooltip>
        <Profile/>
      </Box>
    </Box>
  )
}

export default AppBar