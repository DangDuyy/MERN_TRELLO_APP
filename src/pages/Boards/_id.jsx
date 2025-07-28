/* eslint-disable no-console */
// Board Details
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBoard/AppBoard'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { cloneDeep } from 'lodash'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { moveCardToDifferentColumnAPI, updateBoardDetailsAPI, updateColumnDetailsAPI } from '~/apis'
import PageLoadingSpinner from '~/components/Loading/pageLoadingSpinner'
import {
  fetchBoardDetailsAPI,
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard'
import { selectCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'

function Board() {
  const dispatch = useDispatch()
  //không dùng state của component và dùng state của redux
  // const [board, setBoard] = useState(null)
  //lay du lieu tu trong redux ra
  const board = useSelector(selectCurrentActiveBoard)
  // eslint-disable-next-line no-unused-vars
  const activeCard = useSelector(selectCurrentActiveCard)
  const { boardId } = useParams()
  //goi API bang useEffect
  useEffect(() => {
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

  //function co chuc nang rerender lai cac column va card khi them moi
  //vi chua co redux, nen truyen props createNewColumn sang BoardContent -> ListColumns, sau do co gia tri thi se rerender nguoc lai len _id

  //goi API khi keo tha column xong xuoi, cap nhat lai giao dien cac board
  const moveColumns = (dndOrderedColumn) => {
    const dndOrderedColumnIds = dndOrderedColumn.map( c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumn
    newBoard.columnOrderIds = dndOrderedColumnIds

    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))
    //goi API update board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find( column => column._id === columnId )
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))
    updateColumnDetailsAPI(columnId, { cardOrderIds:dndOrderedCardIds })
  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumn) => {
    const dndOrderedColumnIds = dndOrderedColumn.map( c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumn
    newBoard.columnOrderIds = dndOrderedColumnIds

    dispatch(updateCurrentActiveBoard(newBoard))
    // setBoard(newBoard)
    //goi API xu ly backend
    const prevColumn = dndOrderedColumn.find(c => c._id === prevColumnId)
    const nextColumn = dndOrderedColumn.find(c => c._id === nextColumnId)
    const apiData = {
      currentCardId,
      prevColumnId,
      prevCardOrderIds: prevColumn?.cardOrderIds || [],
      nextColumnId,
      nextCardOrderIds: nextColumn?.cardOrderIds || []
    }
    console.log('Sending moveCardToDifferentColumn API data:', apiData)
    console.log('prevColumn:', prevColumn)
    console.log('nextColumn:', nextColumn)
    moveCardToDifferentColumnAPI(apiData)
  }

  if (!board) {
    return (
      <PageLoadingSpinner caption='Loading Board .....'/>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor:'primary.main' }}>
      {/* Modal active Card, check dong/mo dua theo dieu kien co ton tai data activeCard luu trong Redux hay khong thi moi render. Moi thoi diem chi ton tai 1 cai Modal Card dang Active */}
      <ActiveCard />
      {/* Cac thanh phan con lai cua board detail */}
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}

        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </Container>
  )
}

export default Board