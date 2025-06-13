import Logout from '@mui/icons-material/Logout'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'
export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding:0 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}
            src="https://scontent.fsgn7-2.fna.fbcdn.net/v/t39.30808-1/499543246_1342771207016203_2106652853715018525_n.jpg?stp=c0.512.1536.1536a_dst-jpg_s160x160_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=H4iQ4Ka_vvcQ7kNvwF-knI7&_nc_oc=AdnxAnrb71-6mS37qJTrHWMh7PaFwia4qG_j6if67PVTGTWQ6JgrzWFvqSVtfDIb5JbnUQ9hm8Tlv1QzKXylF8Tu&_nc_zt=24&_nc_ht=scontent.fsgn7-2.fna&_nc_gid=0l9tUMQ3mTbOcJb7jGmQwQ&oh=00_AfOEr6tzh89gd-l_C_Y0nJPzi7CIhXuaGgauIUxSArhykA&oe=6851F606">M</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-Profile"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button-Profile'
          }
        }}
      >
        <MenuItem >
          <Avatar sx={{width: 28, height: 28, mr:2 }} /> Profile
        </MenuItem>
        <MenuItem >
          <Avatar sx={{width: 28, height: 28, mr:2 }} /> My account
        </MenuItem>
        <Divider />
        <MenuItem >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}
