import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'

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
function BoardBar({board}) {
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
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon/>}label={capitalizeFirstLetter(board?.title)}
          clickable>
        </Chip>
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
        <AvatarGroup max={4}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root' : {
              width: 32,
              height: 32,
              fontSize: 16,
              border: 'none',
              color:'white',
              cursor: 'poiter',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}>
          <Tooltip title="dangduydev" alt="dangduydev">
            <Avatar
              src="https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/499543246_1342771207016203_2106652853715018525_n.jpg?stp=c0.512.1536.1536a_dst-jpg_s160x160_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=H4iQ4Ka_vvcQ7kNvwF-knI7&_nc_oc=AdnxAnrb71-6mS37qJTrHWMh7PaFwia4qG_j6if67PVTGTWQ6JgrzWFvqSVtfDIb5JbnUQ9hm8Tlv1QzKXylF8Tu&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=0l9tUMQ3mTbOcJb7jGmQwQ&oh=00_AfOEr6tzh89gd-l_C_Y0nJPzi7CIhXuaGgauIUxSArhykA&oe=6851F606">M
            </Avatar>
          </Tooltip>
          <Tooltip title="dangduydev" alt="dangduydev">
            <Avatar
              src="https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-6/476303807_1267634097863248_296066780915858157_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=cTL9esB-0t4Q7kNvwH-rDSb&_nc_oc=AdlpQpFqFrwURbEtAQ-6aqcRlQotbt27A4L9dZp85maZ9h4NKjoIFKBdOMLC75ly0A3s57Z8brrt3LXcp5Q1jO2l&_nc_zt=23&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=wV94KBobjdj47tOlbuZTUg&oh=00_AfOhJH7X7NOsHKZv_bYWcFx05yastRoY1E5wY9f5LzV6qw&oe=6852E2B5">M
            </Avatar>
          </Tooltip>
          <Tooltip title="dangduydev" alt="dangduydev">
            <Avatar
              src="https://scontent.fsgn7-1.fna.fbcdn.net/v/t39.30808-1/481662335_1359358415198994_6470412699739265827_n.jpg?stp=dst-jpg_s148x148_tt6&_nc_cat=111&ccb=1-7&_nc_sid=7da99a&_nc_ohc=UemxZ_8Z4_sQ7kNvwG0U2jW&_nc_oc=AdlvL5QoAA7FqIQKj6SQgn10e8tEZhgCUtDpfM0UEi3viwUv-XJgq4csCtjjAv6gzSSbbh8HGgLSiGIqM29afHWK&_nc_zt=24&_nc_ht=scontent.fsgn7-1.fna&_nc_gid=dWmKctoY0ky86zObtEltWQ&oh=00_AfN8LlqNmRT3F8CTc9eIb_-SmlahtwfluwC5FoDYSuYHSA&oe=6852D92F">M
            </Avatar>
          </Tooltip>
          <Tooltip title="dangduydev" alt="dangduydev">
            <Avatar
              src="https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/499543246_1342771207016203_2106652853715018525_n.jpg?stp=c0.512.1536.1536a_dst-jpg_s160x160_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=H4iQ4Ka_vvcQ7kNvwF-knI7&_nc_oc=AdnxAnrb71-6mS37qJTrHWMh7PaFwia4qG_j6if67PVTGTWQ6JgrzWFvqSVtfDIb5JbnUQ9hm8Tlv1QzKXylF8Tu&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=0l9tUMQ3mTbOcJb7jGmQwQ&oh=00_AfOEr6tzh89gd-l_C_Y0nJPzi7CIhXuaGgauIUxSArhykA&oe=6851F606">M
            </Avatar>
          </Tooltip>
          <Tooltip title="dangduydev" alt="dangduydev">
            <Avatar
              src="https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/499543246_1342771207016203_2106652853715018525_n.jpg?stp=c0.512.1536.1536a_dst-jpg_s160x160_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=H4iQ4Ka_vvcQ7kNvwF-knI7&_nc_oc=AdnxAnrb71-6mS37qJTrHWMh7PaFwia4qG_j6if67PVTGTWQ6JgrzWFvqSVtfDIb5JbnUQ9hm8Tlv1QzKXylF8Tu&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=0l9tUMQ3mTbOcJb7jGmQwQ&oh=00_AfOEr6tzh89gd-l_C_Y0nJPzi7CIhXuaGgauIUxSArhykA&oe=6851F606">M
            </Avatar>
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}


export default BoardBar