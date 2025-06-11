// Boards List
import AppsIcon from '@mui/icons-material/Apps';
import Box from '@mui/material/Box';
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg';
import ModeSelect from '~/components/ModeSelect';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import WorkSpaces from './Menus/WorkSpaces';

function AppBar() {
  return (
    <Box px={2} sx={{
    // backgroundColor: 'primary.light',
      backgroundColor: 'white',
      width:'100%',
      height: (theme) => theme.trello.appBarHeight, // Đổi sang custom
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Box sx={{display: 'flex', alignItems:'center', gap:2}}>
        <AppsIcon sx={{color: 'primary.main'}}/>
        <Box sx={{display: 'flex', alignContent:'center', gap:0.5}}>
          <SvgIcon component={TrelloIcon} inheritViewBox />
          <Typography variant='span'sx={{fontSize:'1.2rem', fontWeight:'bold', color:'primary.main'}}>Trello</Typography>
        </Box>
        <WorkSpaces/>
      </Box>
      <Box>
        <ModeSelect/>
      </Box>
    </Box>
  )
}

export default AppBar