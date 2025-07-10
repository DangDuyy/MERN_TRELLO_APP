import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'
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

//interceptor: can thiep vao cac response nhan ve
authorizeAxiosInstance.interceptors.response.use((response) => {
  interceptorLoadingElements(false)

  return response
}, (error) => {

  interceptorLoadingElements(false)

  //moi ma httpcode co status nam ngaoi 200 den 299 deu roi vao day
  console.log(error)
  let errorMessage = error?.message
  if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }

  //dung toastify de hien thi loi ra ben ngaoi, ngoai tru 410
  if (error.response?.status !== 410) {
    toast.error(errorMessage)
  }
  return Promise.reject(error)
})

export default authorizeAxiosInstance