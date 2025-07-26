import { createSlice } from '@reduxjs/toolkit'

//khoi tao gia tri 1 slice trong redux
const initialState = {
  currentActiveCard: null
}

//khoi tao 1 slice trong kho luu tru - redux store
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  //reducers: noi xu ly du lieu dong bo
  reducers: {
    //luu y luon la o day can cap ngoac nhon cho function cho reducer cho du code ben trong chi co 1 dong, day la rule cua redux

    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
    },
    updateCurrentActiveCard: (state, action) => {
      const fullCard = action.payload
      //action.payload la chuan dat ten nhan du lieu vao reducer, o day chung ta gan no 1 bien co nghia hon
      //update lai du lieu cho current Active card trong redux
      state.currentActiveCard = fullCard
    }
  },

  extraReducers: (builder) => {}
})

//action creators are generated for each case reducer function
//actions: la noi danh cho cac components ben duoi goi bang dispatch() toi no de cap nhat lai du lieu thong qua reducer(chay dong bo)
//de y o tren thi khong thay properties actions dau ca, boi vi nhung action nay don gian chi la duoc redux tao tu dong theo ten cua reducer

export const { clearCurrentActiveCard, updateCurrentActiveCard } = activeCardSlice.actions

//selectors la noi dang cho cac component ben duoi goi bang hook useSelector() de lay du lieu trong kho redux store ra de su dung
export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}

//cai file nay ten la slice nhung lai export 1 thu goi la user
export const activeCardReducer = activeCardSlice.reducer