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
    })
  }

})