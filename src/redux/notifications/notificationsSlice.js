import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  currentNotifications: null
}

//cac hanh dong goi api (asyncrochous) va cap nhat du lieu vao redux, dung middleware createAsyncThunk di kem voi extra reducer
export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationsAPI',
  async () => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/invitations`)
    return response.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async (notificationId, status) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/invitations/board/${notificationId}`, status)
    return response.data
  }
)

//khoi tao 1 slice trong kho luu tru redux/store
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  //reducers: noi xu ly du lieu dong bo
  reducers: {
    //luu can {} cho function ben trong reducer
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload
    },
    addNotification: (state, action) => {
      const incomingInvitation = action.payload
      //unshift: giong push nhung last in first out (vao sau duoc day len truoc)
      state.currentNotifications.unshift(incomingInvitation)
    }
  },
  // extraReducers: noi xu ly du lieu bat dong bo
  extraReducers: (builder) => {
    //chu yeu bat case fullfill
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incomingInvitation = action.payload
      //doan nay dao nguoc lai invitation nhan duoc, don gian la de hien thi cai moi nhat len dau
      state.currentNotifications = Array.isArray(incomingInvitation) ? incomingInvitation.reverse() : []
    }),
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      let incomingInvitation = action.payload
      //cap nhat lai du lieu boardInvitation (ben trong no se la status moi sau khi update)
      const getInvitation = state.currentNotifications.find( i => i._id === incomingInvitation._id)
      getInvitation.boardInvitation = incomingInvitation.boardInvitation
    })
  }
})
//action creator are generated for each case reducer function
//actions: la noi dang cho cac components ben duoi goi bang dispatch() toi no de cap nhat lai du lieu thong qua reducer(chay dong bo)
// de y o tren thi khong thay properties actions dau ca, boi vi nhung cai actions nay don gian la duoc thang redux tao tu dong theo ten cua reducer nhe
export const {
  clearCurrentNotifications,
  updateCurrentNotifications,
  addNotification
} = notificationsSlice.actions

//selectors: la noi danh cho cac components ben duoi goi bang hook useSelector() de lay du lieu tu trong kho redux store de su dung
export const selectCurrentNotifications = state => {
  return state.notifications.currentNotifications
}

//tuy file ten la notificationsSlice nhung khi export phai lai reducers
//export default notificationsSlice.reducer
export const notificationsReducer = notificationsSlice.reducer