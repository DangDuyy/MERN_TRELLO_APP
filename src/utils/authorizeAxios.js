import axios from 'axios'
import { refreshTokenAPI } from '~/apis'
import { logoutUserAPI } from '~/redux/user/userSlice'
import { interceptorLoadingElements } from './formatters'

// Không thể suport store from /redux/store' theo cách thông thường ở đây
// * Giải pháp: Inject store: La Kỹ thuật khi cần sử dụng biển redux store ở các file ngoài pham vi component như file authorizeAxios hiện tại
// * Hiệu đơn giản: khi ứng dụng bắt đầu chạy tên, code sẽ chạy vào main.jsx đầu tiên, từ bên đó chúng ta gọi hàm injectStore ngay lập tức đề gân biên mainStore vào biển axiosReduxStore cục bộ trong file này
// https://redux.s.org/au/code-structure@now-can-1-be-the-redux-store-in-non-component-files
let axiosReduxStore
export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}

//khởi tạo 1 đối tượng axios (authorizeAxiosInstance) mục đích để custom và cấu hình chung của dự án
const authorizeAxiosInstance = axios.create()

//thời gian chờ tối da 1 request là 10p
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10

//withcredentials: sẽ cho phép axios gửi cookie trong mỗi req lên be( thường dùng trong jwt token )
authorizeAxiosInstance.defaults.withCredentials = true

//cấu hình intercepter
//interceptor: can thiep vao cac request api
authorizeAxiosInstance.interceptors.request.use((config) => {

  interceptorLoadingElements(true)
  return config
}, (error) => {
  return Promise.reject(error)
})

//Khôi tạo một cái promise cho việc gọi api refresh token
// Mục đích tao Promise nay đề khi nào gọi api refresh_token xong xuôi thì mới retry lai nhiêu api bị tôi thước đo
//https://www.thedutchlab.com/en/insights/using-arios-interceptors-for-refreshing-your-api-token
let refreshTokenPromise = null

//interceptor: can thiep vao cac response nhan ve
authorizeAxiosInstance.interceptors.response.use((response) => {
  interceptorLoadingElements(false)

  return response
}, (error) => {

  interceptorLoadingElements(false)

  //moi ma httpcode co status nam ngaoi 200 den 299 deu roi vao day
  if (error.response?.status === 401) {
    axiosReduxStore.dispatch(logoutUserAPI(false))
  }

  //   Trường hợp 2: Nêu như nhân mà 410 từ BE, thi se qui api refresh token dề làm mới lại accessToken
  // Đầu tiên lày được các request API đang bị lỗi thông qua error.config
  const originalRequests = error.config
  if (error.response?.status === 410 && !originalRequests._retry) {
    originalRequests._retry = true

    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenAPI(

      ).then( data => {
        //dong thoi accessToken da nam trong http only cokkie tu backend
        return data?.accessToken
      }
      ).catch(() => {
        //neu nhan bat ky loi nao tu api refreshtoken thi chu dong dang xuat luon
        axiosReduxStore.dispatch(logoutUserAPI(false))
      }
      ).finally(() => {
        //du thanh con API hay loi deu gang refreshToken ve null
        refreshTokenPromise = null
      }
      )
    }

    //cac truong hop return hay refreshTokenPromise chay thanh cong va xu ly them o day:
    return refreshTokenPromise.then(accessToken => {
      return authorizeAxiosInstance(originalRequests)
    })
  }

  // Xử lý tập trung phần hiển thị thông bác tôi trở về từ mọi API ở đây (viet code một lần Clean Code) console.log error ra là sẽ thấy cấu trúc data đần tối massage lỗi như dưới đây
  let errorMessage = error?.message
  if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }

  return Promise.reject(error)
})

export default authorizeAxiosInstance