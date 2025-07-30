// Boards List
import { useState } from 'react'
import AppsIcon from '@mui/icons-material/Apps'
import Box from '@mui/material/Box'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
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
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'
import ToolTip from '@mui/material/Tooltip'
import Notifications from './Notifications/Notifications'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Box px={2} sx={{
    // backgroundColor: 'primary.light',
      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0' ),
      width:'100%',
      height: (theme) => theme.trello.appBarHeight, // Đổi sang custom
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap:2,
      overflowX: 'auto'
    }}>
      <Box sx={{ display: 'flex', alignItems:'center', gap:2 }}>
        <Link to="/boards">
          <ToolTip title="Board List">
            <AppsIcon sx={{ color:'white', verticalAlign: 'middle' }}/>
          </ToolTip>
        </Link>
        <Link to="/">
          <Box sx={{ display: 'flex', alignItems:'center', gap:0.5 }}>
            <SvgIcon component={TrelloIcon} fontSize='small' inheritViewBox sx={{ color: 'white' }}/>
            <Typography variant='span'sx={{ fontSize:'1rem', fontWeight:'bold', color:'white' }}>Trello</Typography>
          </Box>
        </Link>
        <Box sx={{ display: { xs:'none', md:'flex' }, gap:1 }}>
          <WorkSpaces/>
          <Recent/>
          <Starred/>
          <Templates/>
          <Button variant="outlined" sx={{ color: 'white' }} startIcon={<LibraryAddIcon/> }>CREATE</Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems:'center', gap:2 }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          size="small"
          //tac dung de cho thang search no nhay len tren
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }}/>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CloseIcon sx={{ color: searchValue ? 'white' : 'transparent', cursor:'pointer' }}
                  onClick={() => setSearchValue('')}
                  fontSize='small'/>
              </InputAdornment>
              //kiem tra searchValue neu co gia tri thi cho mau trang con khong thi trong suot
            )
          }}
          sx={{
            minWidth: 120,
            maxWidth: 180,
            '& label': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& input': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
              // KHÔNG set borderWidth ở đây!
            }
          }}
        />
        {/* dark light system mode */}
        <ModeSelect sx={{ minWidth: 120 }} />
        {/* xu ly hien thi cac thong bao */}
        <Notifications />
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ color: 'white' }}/>
        </Tooltip>
        <Profile/>
      </Box>
    </Box>
  )
}

export default AppBar