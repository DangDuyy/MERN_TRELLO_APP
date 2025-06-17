import { DndContext } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { mapOrder } from '~/utils/sorts'
import ListColumns from './ListColumns/ListColumns'

function BoardContent({board}) {
  const [orderedColumnState, setOrderedColumnState] = useState([])

  useEffect(() => {
    setOrderedColumnState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    console.log('event ', event )
    const { active, over } = event

    //kiểm tra nếu kéo thả linh tinh vùng ngoài thì return luôn tránh lỗi
    if (!over) return

    //nếu vị trí kéo thả khác với vị trí ban đầu
    if (active.id !== over.id) {
      //lấy vị trí cũ từ thằng áctive
      const oldIndex = orderedColumnState.findIndex( c => c._id === active.id)
      //lấy vị trí mới từ thằng over
      const newIndex = orderedColumnState.findIndex( c => c._id === over.id)

      const dndOrderedColumn = arrayMove(orderedColumnState, oldIndex, newIndex)
      // const dndOrderedColumnIds = dndOrderedColumn.map( c => c._id)
      // console.log('dndOrderedColumn', dndOrderedColumn)

      //cập nhật statecolumn ban đàu sau khi kéo thả
      setOrderedColumnState(dndOrderedColumn)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box sx={{
        width:'100%',
        height: (theme) => theme.trello.boardContentHeight,
        // alignItems: 'center',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumnState}/>
      </Box>
    </DndContext>
  )
}

export default BoardContent
