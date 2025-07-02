/* eslint-disable no-console */
// Board Details
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBoard/AppBoard'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useState, useEffect } from 'react'
import { mapOrder } from '~/utils/sorts'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI, updateBoardDetailsAPI, updateColumnDetailsAPI } from '~/apis'
import { Box } from '@mui/material'
function Board() {
  const [board, setBoard] = useState(null)

  //goi API bang useEffect
  useEffect(() => {
    const boardId = '6861f8ec46d5cb5cdb103bb9'
    fetchBoardDetailsAPI(boardId).then(board => {

      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach((column) => {
        column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
      })
      setBoard(board)
    })
  }, [])

  //function co chuc nang rerender lai cac column va card khi them moi
  //vi chua co redux, nen truyen props createNewColumn sang BoardContent -> ListColumns, sau do co gia tri thi se rerender nguoc lai len _id
  const createNewColumn = async (newColumnData) => {
    const createColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    // console.log(createColumn)
    //cap nhat lai state board

    const newBoard = { ...board }
    newBoard.columns.push(createColumn)
    newBoard.columnOrderIds.push(createColumn._id)
    setBoard(newBoard)
  }
  const createNewCard = async (newCardData) => {
    const createCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    //card kho hon vi "phu thuoc vao column" thay vi truc tiep vao board
    const newBoard = { ...board }
    //tim ra column chua chinh cai card vua duoc tao
    const columnToUpdate = newBoard.columns.find( column => column._id === createCard.columnId )
    if (columnToUpdate) {
      columnToUpdate.cards.push(createCard)
      columnToUpdate.cardOrderIds.push(createCard._id)
    }
    setBoard(newBoard)
    // console.log(createCard)
    //cap nhat lai state board
  }
  //goi API khi keo tha column xong xuoi, cap nhat lai giao dien cac board
  const moveColumns = (dndOrderedColumn) => {
    const dndOrderedColumnIds = dndOrderedColumn.map( c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumn
    newBoard.columnOrderIds = dndOrderedColumnIds

    setBoard(newBoard)
    //goi API update board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find( column => column._id === columnId )
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
    updateColumnDetailsAPI(columnId, { cardOrderIds:dndOrderedCardIds })
  }
  if (!board) {
    return (
      <Box>Loading...</Box>
    )
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor:'primary.main' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}/>
    </Container>
  )
}

export default Board