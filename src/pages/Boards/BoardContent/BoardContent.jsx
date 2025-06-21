import { defaultDropAnimationSideEffects, DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors, closestCorners } from '@dnd-kit/core'
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
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  //timf 1 cai column cho card ID
  const findColumnByCardId = (cardId) => {
    return orderedColumnState.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }

  useEffect(() => {
    setOrderedColumnState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  //cập nhật lại state trong trường hợp di chuyển card giữa các column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
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

        //đối với trường hợp dragend thì phải cập nhật lại chuẩn dữ liệu columnId trong card sau khi kéo card ở 2 column khác nhau
        const rebuild_activeDraggingCard = {
          ...activeDraggingCardData,
          columnId: nextOverColumn
        }

        // console.log('rebuild_activeDraggingCard ',rebuild_activeDraggingCard)
        //tiep theo la them cai card dang keo vao overcolumn
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      // console.log('nextColumns ', nextColumns)
      return nextColumns
    })
  }
  //trigger khi bat dau keo 1 phan tu
  const handleDragStart = (event) => {
    // console.log('handleDragStart = ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD: ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      // Tìm column chứa card đang kéo và set vào state
      const oldColumn = findColumnByCardId(event?.active?.id)
      setOldColumnWhenDraggingCard(oldColumn)
    }
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
      moveCardBetweenDifferentColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)
    }
  }

  //trigger khi ket thu hanh dong tha
  //hàm này để cập nhật column đúng khi kéo thả
  const handleDragEnd = (event) => {

    const { active, over } = event

    //kiểm tra nếu kéo thả linh tinh vùng ngoài thì return luôn tránh lỗi
    if (!active || !over) return

    //xử lý kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('Hành động kéo thả card, không làm gì cả')
      //activeCard la cai card dang duoc keo
      const { id : activeDraggingCardId, data: { current: activeDraggingCardData } } = active

      //overCard la cai card dang tuong tac tren hoac duoi so voi cac card duoc keo
      const { id: overCardId } = over

      //tim 2 column theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      //Phải dùng tới activeDragitemdata.columnId (set vào state từ bước handleDragStart) chứ không phải activeData trong scope handleDragend này vì sau khi đi qua onDragOver tới đây là state của card đã bị cập nhật 1 lần rồi
      // console.log('oldColumn when dragging card ', oldColumnWhenDraggingCard )
      // console.log('over Column ', overColumn )
      //2 column khac nhau moi xu ly dong nay
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)}
      else
      {
        //hanh dong keo tha card trong cung 1 cai column
        //lay vi tri cu (tu thang oldColumnDraggingCard)
        // Đúng:
        const oldColumnIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        const newColumnIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === overCardId)

        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldColumnIndex, newColumnIndex)
        // const dndOrderedColumnIds = dndOrderedColumn.map( c => c._id)
        // console.log('dndOrderedColumn', dndOrderedColumn)

        //cập nhật statecolumn ban đàu sau khi kéo thả
        // setOrderedColumnState(dndOrderedCards)
        console.log('dndOrderedCards ', dndOrderedCards)
        setOrderedColumnState(prevColumn => {
          //clone mang orderedColumnState cu ra 1 cai moi de xu ly data roi return, cap nhat lai orderedColumnState moi
          const nextColumns = cloneDeep(prevColumn)

          const targetColumn = nextColumns.find(column => column._id === overColumn._id)
          console.log('tagetColumn ', targetColumn )

          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          return nextColumns
        })
      }
    }

    //xử lý kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      console.log('Hành động kéo thả card, không làm gì cả')
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

    // console.log('activeDragItemId ', activeDragItemId )
    // console.log('activeDragItemType ', activeDragItemType )
    // console.log('activeDragItemData ', activeDragItemData )


    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
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
      sensors={mySensors}
      //thuan toan phat hien va cham (neu khong co no thi card voi cover lon se khong keo qua column duoc vi luc nay no bi conflict giua card và column), dùng closeCorner thay vì closeCenter
      collisionDetection={closestCorners}
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
