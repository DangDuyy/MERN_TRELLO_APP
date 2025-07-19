import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { toast } from 'react-toastify'
//khởi tạo giá trị của state của 1 slice trong redux
const initialState = {
  currentUser: null
}

//các hành động api (bất đồng bộ) và cập nhật dữ liệu vào redux, dùng middleware createAsyncThunk đi kèm với extraReducers
export const loginUserAPI = createAsyncThunk(
  'users/loginUserAPI',
  async (data) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'users/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
    console.log(response)
    if (showSuccessMessage) {
      toast.success('Logged out successfully!')
    }
    return response.data
  }
)
//khởi tạo một cái slice trong kho lưu trữ redux
export const userSlice = createSlice({
  name: 'user',
  initialState,
  //reducers: nơi xử lý dữ liệu dồng bộ
  reducers: {},
  //extraReducers: nơi xử lí dữ liệu bất đồng bộ, khác với reducers (object), cái này là 1 arrow function
  extraReducers: (builder) => {
    //chu yeu bat case: fulfilled
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      //action.payload chinh la response.data tra ve o tren
      const user = action.payload
      state.currentUser = user
    })
    builder.addCase(logoutUserAPI.fulfilled, (state, action) => {
      state.currentUser =null
    })
  }
})

//actions: là nơi dành cho các componenent bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer(chạy đồng bộ)
//lưu ý ở trên không thấy properties actions đâu cả , đơn giản vì những actions này được redux tạo tự động theo tên của reducer
//thường dùng để cập nhật redux store
// Action creators are generated for each case reducer function
// export const {} = userSlice.actions
//selector: là nơi dành cho các component bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store ra sử dụng
//hơi khác với actions: lấy dữ liệu ra khỏi redux store
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

//cài file này tên là activeBoardSlice NHƯNG chúng ta sẽ export 1 thử tên là reducer
// export default activeBoardSlice.reducer

export const userReducer = userSlice.reducer