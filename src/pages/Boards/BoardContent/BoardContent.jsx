import { defaultDropAnimationSideEffects, DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { mapOrder } from '~/utils/sorts'
import ListColumns from './ListColumns/ListColumns'
import Card from './ListColumns/Column/ListCards/Card/Card'
import Column from './ListColumns/Column/Column'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  //nếu dùng pointer sensor phải kết hợp với thuộc tính css touch-action: none ở những phần tử kéo thả - nhưng mà còn bug
  //chỉ khi kéo thả mới bắt sự kiện còn click chuột thì không
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance:5 } })

  const mySensors = useSensors(mouseSensor, touchSensor )

  const [orderedColumnState, setOrderedColumnState] = useState([])

  //cung 1 thoi diem chi duoc 1 column hoac card duoc keo tha
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumnState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  //trigger khi bat dau keo 1 phan tu
  const handleDragStart = (event) => {
    console.log('handleDragStart = ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD: ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  //trigger khi ket thu hanh dong tha
  //hàm này để cập nhật column đúng khi kéo thả
  const handleDragEnd = (event) => {
    // console.log('activeDragItemId ', activeDragItemId )
    // console.log('activeDragItemType ', activeDragItemType )
    // console.log('activeDragItemData ', activeDragItemData )
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
      setActiveDragItemId(null)
      setActiveDragItemType(null)
      setActiveDragItemData(null)
    }
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      style: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext 
      onDragEnd={handleDragEnd}
      sensors={mySensors}
      onDragStart={handleDragStart}>
      <Box sx={{
        width:'100%',
        height: (theme) => theme.trello.boardContentHeight,
        // alignItems: 'center',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumnState}/>
        <DragOverlay dropAnimation={customDropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
