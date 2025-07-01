import { Button } from '@mui/material'
import Column from './Column/Column'
import Box from '@mui/material/Box'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'

function ListColumns({ columns }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toogleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error('Plese enter column title!')
      return
    }
    toogleOpenNewColumnForm()
    setNewColumnTitle('')
    // console.log('newColumnTitle ', newColumnTitle )
    //goi api o day...
  }
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        // inherit la ke thua tu lop cha
        width: '100%',
        height: '100%',
        display: 'flex',
        bgColor: 'inherit',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}
      >
        {columns?.map( column => (<Column key={column._id} column={column}/>)
        )}
        {!openNewColumnForm
          ? <Box onClick={toogleOpenNewColumnForm} sx={{
            minWidth: 250,
            maxWidth: 250,
            mx: 2,
            borderRadius: 6,
            height: 'fit-content',
            backgroundColor: '#ffffff3d'
          }}>
            <Button startIcon={<NoteAddIcon/>} sx={{
              color: 'white',
              width: '100%',
              justifyContent: 'flex-start',
              pl: 2.5,
              py: 1
            }}>
              Add new column
            </Button>
          </Box>
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgColor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              id="outlined-search"
              label="Enter column title..."
              type="text"
              variant="outlined"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              size="small"
              //tac dung de cho thang search no nhay len tren
              sx={{
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
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Button
                onClick={addNewColumn}
                variant="contained"
                color="success"
                size="small"
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgColor: (theme) => theme.palette.success.main }
                }}
              >Add column</Button>
              <CloseIcon
                sx={{
                  color: 'white',
                  cursor:'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
                onClick={toogleOpenNewColumnForm}
                fontSize='small'/>
            </Box>
          </Box>
        }

        {/*  Box add new column */}
      </Box>
    </SortableContext>
  )
}

export default ListColumns