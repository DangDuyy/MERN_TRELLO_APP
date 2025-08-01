import DoneIcon from '@mui/icons-material/Done'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import { useEffect, useState } from 'react' // ✅ Loại bỏ useCallback
import { useDispatch, useSelector } from 'react-redux'
import { fetchInvitationsAPI, selectCurrentNotifications, updateBoardInvitationAPI, addNotification } from '~/redux/notifications/notificationsSlice'
import { socketIoInstance } from '~/main'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

const BOARD_INVITATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

function Notifications() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [newNotification, setNewNotification] = useState(false)
  const open = Boolean(anchorEl)

  const notifications = useSelector(selectCurrentNotifications)
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget)
    setNewNotification(false)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const updateBoardInvitation = (status, invitationId) => {
    dispatch(updateBoardInvitationAPI({ invitationId, status })).then((res) => {
      if (res.payload.boardInvitation.status === BOARD_INVITATION_STATUS.ACCEPTED) {
        navigate(`/boards/${res.payload.boardInvitation.boardId}`)
      }
    })
  }

  // ✅ Socket handler đơn giản - chỉ 1 useEffect duy nhất
  useEffect(() => {
    if (!currentUser?._id) return

    // Fetch data
    dispatch(fetchInvitationsAPI())

    // Socket handler
    const handleInvitation = (invitation) => {
      if (invitation.inviteeId === currentUser._id) {
        // ✅ Check duplicate trực tiếp với current notifications
        const isDuplicate = notifications?.some(n => n._id === invitation._id)
        if (!isDuplicate) {
          dispatch(addNotification(invitation))
          setNewNotification(true)
        }
      }
    }

    // ✅ Clean up và setup socket
    socketIoInstance.off('BE_USER_INVITED_TO_BOARD')
    socketIoInstance.on('BE_USER_INVITED_TO_BOARD', handleInvitation)

    return () => {
      socketIoInstance.off('BE_USER_INVITED_TO_BOARD')
    }
  }, [currentUser?._id, dispatch])

  return (
    <Box>
      <Tooltip title="Notifications">
        <Badge
          color="warning"
          variant={newNotification ? 'dot' : 'none'}
          sx={{ cursor: 'pointer' }}
          id="basic-button-open-notification"
          aria-controls={open ? 'basic-notification-drop-down' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsNoneIcon sx={{
            color: newNotification ? 'yellow' : 'white'
          }} />
        </Badge>
      </Tooltip>

      <Menu
        sx={{ mt: 2 }}
        id="basic-notification-drop-down"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button-open-notification' }}
      >
        {(!notifications || notifications.length === 0) &&
          <MenuItem sx={{ minWidth: 200 }}>You do not have any new notifications.</MenuItem>
        }

        {notifications?.map((notification, index) =>
          <Box key={notification._id || index}> {/* ✅ Sử dụng _id làm key */}
            <MenuItem sx={{
              minWidth: 200,
              maxWidth: 360,
              overflowY: 'auto'
            }}>
              <Box sx={{ maxWidth: '100%', wordBreak: 'break-word', whiteSpace: 'pre-wrap', display: 'flex', flexDirection: 'column', gap: 1 }}>
                {/* Nội dung của thông báo */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box><GroupAddIcon fontSize="small" /></Box>
                  <Box>
                    <strong>{notification.inviter?.displayName}</strong> had invited you to join the board <strong>{notification.board?.title}</strong>
                  </Box>
                </Box>

                {/* Khi Status của thông báo này là PENDING thì sẽ hiện 2 Button */}
                {notification.boardInvitation?.status === BOARD_INVITATION_STATUS.PENDING &&
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                    <Button
                      className="interceptor-loading"
                      type="submit"
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => updateBoardInvitation(BOARD_INVITATION_STATUS.ACCEPTED, notification._id)}
                    >
                      Accept
                    </Button>
                    <Button
                      className="interceptor-loading"
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => updateBoardInvitation(BOARD_INVITATION_STATUS.REJECTED, notification._id)}
                    >
                      Reject
                    </Button>
                  </Box>
                }

                {/* Khi Status của thông báo này là ACCEPTED hoặc REJECTED thì sẽ hiện thông tin đó lên */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                  {notification.boardInvitation?.status === BOARD_INVITATION_STATUS.ACCEPTED &&
                    <Chip icon={<DoneIcon />} label="Accepted" color="success" size="small" />
                  }
                  {notification.boardInvitation?.status === BOARD_INVITATION_STATUS.REJECTED &&
                    <Chip icon={<NotInterestedIcon />} label="Rejected" color="warning" size="small" />
                  }
                </Box>

                {/* Thời gian của thông báo */}
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="span" sx={{ fontSize: '13px' }}>
                    {moment(notification.createdAt).format('llll')}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>

            {/* Cái đường kẻ Divider sẽ không cho hiện nếu là phần tử cuối */}
            {index !== (notifications?.length - 1) && <Divider />}
          </Box>
        )}
      </Menu>
    </Box>
  )
}

export default Notifications