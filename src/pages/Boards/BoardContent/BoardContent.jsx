import { defaultDropAnimationSideEffects, DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { mapOrder } from '~/utils/sorts'
import ListColumns from './ListColumns/ListColumns'
import Card from './ListColumns/Column/ListCards/Card/Card'
import Column from './ListColumns/Column/Column'
import { cloneDeep } from 'lodash'
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

  //timf 1 cai column cho card ID
  const findColumnByCardId = (cardId) =>{
    return orderedColumnState.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }

  useEffect(() => {
    setOrderedColumnState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  //trigger khi bat dau keo 1 phan tu
  const handleDragStart = (event) => {
    // console.log('handleDragStart = ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD: ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  //trigger khi ket thu hanh dong tha
  //hàm này để cập nhật column đúng khi kéo thả
  const handleDragEnd = (event) => {

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('Hành động kéo thả card, không làm gì cả')
      return
    }
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

  //trigger trong quá trình kéo 1 phần tử
  const handleDragOver = (event) => {
    //KHÔNG LÀM GÌ KHI KÉO COLUMN
    // console.log('handleDragover: ', event)

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = event

    //kiểm tra nếu kéo thả linh tinh vùng ngoài thì return luôn tránh lỗi
    if (!active || !over) return

    //activeCard la cai card dang duoc keo
    const { id : activeDraggingCardId, data: { current: activeDraggingCardData } } = active

    //overCard la cai card dang tuong tac tren hoac duoi so voi cac card duoc keo
    const { id: overCardId } = over

    //tim 2 column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    //2 column khac nhau moi xu ly dong nay
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumnState(prevColumn => {
        //tim vi tris cua thz overCard, noi ma active card sap duoc tha
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
        // console.log('overCardIndex ', overCardIndex)


        //logic tinh toan cho vi tri index moi (tren hoac duoi cua overCard)
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.cards.length + 1

        //clone mang orderedColumnState cu ra 1 cai moi de xu ly data roi return, cap nhat lai orderedColumnState moi
        const nextColumns = cloneDeep(prevColumn)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        //xu li column cu 
        if (nextActiveColumn) {
          //xoa card o column cu
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          //cap nhat lai mang cardOrderIds cho chuan du lieu
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        //xu ly column moi
        if (nextOverColumn) {
          //kiem tra xem cai card dang keo co nam o overcolumn chua, neu chua thi xoa truoc
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          //tiep theo la them cai card dang keo vao overcolumn
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        console.log('nextColumns ', nextColumns)
        return nextColumns
      })
    }
  }

  return (
    <DndContext
      sensors={mySensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}>
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
