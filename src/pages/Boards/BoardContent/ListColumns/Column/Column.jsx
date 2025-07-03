import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ContentCopy, ContentPaste } from '@mui/icons-material'
import AddCardIcon from '@mui/icons-material/AddCard'
import CloseIcon from '@mui/icons-material/Close'
import Cloud from '@mui/icons-material/Cloud'
import ContentCut from '@mui/icons-material/ContentCut'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, Tooltip, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { toast } from 'react-toastify'
import ListCard from './ListCards/ListCard'
import { useConfirm } from 'material-ui-confirm'

function Column({ column, createNewCard, deleteColumnDetails }) {
  //sortable context
  //isDraging là trong khi kéo thả
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: column._id, data: { ...column } })
  const dndKitColumnStyles = {
    // touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    //trong khi kéo thả sẽ làm mờ
    opacity: isDragging ? 0.5 : undefined
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const orderedCard = column.cards

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toogleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const [newCardTitle, setNewCardTitle] = useState('')
  const addNewCard = () => {
    if (!newCardTitle) {
      toast.error('Plese enter card title!', { position: 'bottom-right' })
      return
    }

    //tao du lieu column de goi API
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }
    //vi chua co redux, nen truyen props createNewColumn sang BoardContent -> ListColumns, sau do co gia tri thi se rerender nguoc lai len _id
    createNewCard(newCardData)

    toogleOpenNewCardForm()
    setNewCardTitle('')
    // console.log('newColumnTitle ', newColumnTitle )
    //goi api o day...
  }

  const confirmDeteteColumn = useConfirm()
  //ham de xoa column va cac card ben trong no
  const handleDeleteColumn = () => {
    confirmDeteteColumn({
      title: 'Delete Columns ?',
      description: 'This action will delete column and its card. Are you sure?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'

      // confirmationKeyword: 'Delete'
    }).then(() => {
      //truyen props deletecolumnDetails xuong tung lop
      deleteColumnDetails(column._id)
    }).catch()
  }
  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: 300,
          maxWidth: 300,
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}
      >
        {/* Box column header */}
        <Box sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          p:2,
          display: 'flex',
          alignItems: 'center',
          justifyContent:'space-between'
        }}>
          <Typography variant="h6" sx={{
            fontWeight:'bold',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title="More options">
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor:'pointer' }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basicolumn-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basicolumn-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'basic-column-dropdown'
                }
              }}
            >
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .add-card-icon': { color: 'success.light' } }
                }}
                onClick={toogleOpenNewCardForm}>
                <ListItemIcon><AddCardIcon className="add-card-icon" fontSize="small" /></ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={handleDeleteColumn}
                sx={{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .delete-forever-icon': { color: 'warning.dark' } }
                }}>
                <ListItemIcon><DeleteForeverIcon className="delete-forever-icon" fontSize="small" /></ListItemIcon>
                <ListItemText>Delete this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        <ListCard cards={orderedCard} />
        {/* Box column footer */}
        <Box sx={{
          height: (theme) => theme.trello.columnFooterHeight,
          p:2,
          display: 'flex',
          alignItems: 'center',
          justifyContent:'space-between'
        }}>
          {!openNewCardForm
            ?
            <Box sx={{
              height: '100%',
              width: '100%', // Thêm dòng này

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Button startIcon={ <AddCardIcon/> } onClick={toogleOpenNewCardForm}>Add new card</Button>
              <Tooltip title="Drap to move">
                <DragHandleIcon sx={{ cursor: 'pointer' }}/>
              </Tooltip>
            </Box>
            :
            <Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center'
            }}>
              <TextField
                id="outlined-search"
                label="Enter card title..."
                type="text"
                variant="outlined"
                autoFocus
                data-no-dnd="true"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                size="small"
                //tac dung de cho thang search no nhay len tren
                sx={{
                  '& label': { color: 'text.primary' },
                  '& label.Mui-focused': { color: theme => theme.palette.primary.main },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333463' : 'white')
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: theme => theme.palette.primary.main },
                    '&:hover fieldset': { borderColor: theme => theme.palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor: theme => theme.palette.primary.main } },
                  // KHÔNG set borderWidth ở đây!
                  '& .MuiOutlinedInput-input' : {
                    borderRadius: 1
                  }
                }}
              />
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Button
                  onClick={addNewCard}
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': { bgColor: (theme) => theme.palette.success.main }
                  }}
                >Add</Button>
                <CloseIcon
                  sx={{
                    color: (theme) => theme.palette.warning.light,
                    cursor:'pointer',
                    '&:hover': { color: 'white' }
                  }}
                  onClick={toogleOpenNewCardForm}
                  fontSize='small'/>
              </Box>
            </Box>
          }
        </Box>
      </Box>
    </div>
  )
}

export default Column