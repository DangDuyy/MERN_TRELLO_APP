import { Button } from '@mui/material'
import Column from './Column/Column'
import Box from '@mui/material/Box'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

function ListColumns({columns}) {
  return (
    <Box sx={{
      // inherit la ke thua tu lop cha
      width: '100%',
      height: '100%',
      display: 'flex',
      bgColor: 'inherit',
      overflowX: 'auto',
      overflowY: 'hidden',
      '&::-webkit-scrollbar-track': { m: 2}
    }}
    >
      {columns?.map( column => (<Column key={column._id} column={column}/>)
      )}

      {/*  Box add new column */}
      <Box sx={{
        minWidth: 200,
        maxWidth: 200,
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
    </Box>
 )
}

export default ListColumns