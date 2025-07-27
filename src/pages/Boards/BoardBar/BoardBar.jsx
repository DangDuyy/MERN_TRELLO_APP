import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import { Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { capitalizeFirstLetter } from '~/utils/formatters'
import BoardUserGroup from './BoardUserGroup'

const MENU_STYLES = {
  color:'white',
  backgroundColor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root':{
    color: 'white'
  }
}
function BoardBar({ board }) {
  return (
    <Box px={2} sx={{
      width:'100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
      gap:2,
      paddingX: 2,
      overflowX: 'auto',
      borderBottom: '1px solid'
    }}>
      <Box sx={{ display: 'flex', alignItems:'center', gap:2 }}>
        <Tooltip title={board?.description}>
          <Chip
            sx={MENU_STYLES}
            icon={<DashboardIcon/>}label={capitalizeFirstLetter(board?.title)}
            clickable>
          </Chip>
        </Tooltip>
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon/>}label={capitalizeFirstLetter(board?.type)}
          clickable>
        </Chip>
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon/>}label="Add to Google Drive"
          clickable>
        </Chip>
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon/>}label="Automation"
          clickable>
        </Chip>
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon/>}label="Filter"
          clickable>
        </Chip>
      </Box>
      <Box sx={{ display: 'flex', alignItems:'center', gap:2 }}>
        <Button
          variant="outlined"
          sx={{
            color: 'white',
            borderColor:'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
          startIcon={<PersonAddIcon/>} >
          Invite
        </Button>
        {/* xu ly hien thi user trong 1 board */}
        <BoardUserGroup boardUsers={board.FE_allUsers}/>

      </Box>
    </Box>
  )
}


export default BoardBar