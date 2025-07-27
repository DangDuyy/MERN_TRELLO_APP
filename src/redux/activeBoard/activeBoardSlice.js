import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT } from '~/utils/constants'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { mapOrder } from '~/utils/sorts'
//khởi tạo giá trị của state của 1 slice trong redux
const initialState = {
  currentActiveBoard: null
}

//các hành động api (bất đồng bộ) và cập nhật dữ liệu vào redux, dùng middleware createAsyncThunk đi kèm với extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
  }
)
//khởi tạo một cái slice trong kho lưu trữ redux
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  //reducers: nơi xử lý dữ liệu dồng bộ
  reducers: {
    //lưu cần {} cho function bên trong reducers
    updateCurrentActiveBoard: (state, action) => {
      //action.payload là chuẩn đặt tên nhận dữ liệu vào reducer, ở đây chúng ta gán nó ra 1 biến có nghĩa hơn
      const board = action.payload
      //xử lý dữ liệu nếu cần thiết
      //...

      //update lại dữ liệu của currentActiveBoard
      state.currentActiveBoard = board
    },
    updateCardInBoard: (state, action) => {
      //update nested data (redux)
      const incomingCard = action.payload

      //tim dan tu board den conlumn roi den card
      const column = state.currentActiveBoard.columns.find(i => i._id === incomingCard.columnId)
      if (column) {
        const card = column.cards.find(i => i._id === incomingCard._id)
        if (card) {
          //dung cach nay de luu tat cac attribute cua card dang tuong tac vao redux
          Object.keys(incomingCard).forEach(key => {
            card[key] = incomingCard[key]
          })
        }
      }
    }
  },
  //extraReducers: nơi xử lí dữ liệu bất đồng bộ, khác với reducers (object), cái này là 1 arrow function
  extraReducers: (builder) => {
    //chu yeu bat case: fulfilled
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      //action.payload chinh la response.data tra ve o tren
      let board = action.payload
      //thanh vien trong board se la gop lai cua 2 mang owner va member
      board.FE_allUsers = board.owners.concat(board.members)
      //xử lý dữ liệu nếu cần thiết
      //...
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach((column) => {
        column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
      })
      //update lại dữ liệu của currentActiveBoard
      //giong nhu setState cua component
      state.currentActiveBoard = board
    })
  }
})

//actions: là nơi dành cho các componenent bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer(chạy đồng bộ)
//lưu ý ở trên không thấy properties actions đâu cả , đơn giản vì những actions này được redux tạo tự động theo tên của reducer
//thường dùng để cập nhật redux store
// Action creators are generated for each case reducer function
export const { updateCurrentActiveBoard, updateCardInBoard } = activeBoardSlice.actions
//selector: là nơi dành cho các component bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store ra sử dụng
//hơi khác với actions: lấy dữ liệu ra khỏi redux store
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

//cài file này tên là activeBoardSlice NHƯNG chúng ta sẽ export 1 thử tên là reducer
// export default activeBoardSlice.reducer

export const activeBoardReducer = activeBoardSlice.reducer