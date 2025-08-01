// Boards List
import AppsIcon from '@mui/icons-material/Apps'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import ToolTip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import Profile from './Menus/Profile'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import WorkSpaces from './Menus/WorkSpaces'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'

function AppBar() {
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
        {/* tim kiem nhanh 1 hay nhieu board, asynchronous de vua search vua goi api de suggest ten board theo input user nhap vao*/}
        <AutoCompleteSearchBoard/>
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