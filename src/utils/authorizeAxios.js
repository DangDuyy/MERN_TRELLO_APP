import axios from 'axios'

//khởi tạo 1 đối tượng axios (authorizeAxiosInstance) mục đích để custom và cấu hình chung của dự án
const authorizeAxiosInstance = axios.create()

//thời gian chờ tối da 1 request là 10p
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10

//withcredentials: sẽ cho phép axios gửi cookie trong mỗi req lên be( thường dùng trong jwt token )
authorizeAxiosInstance.defaults.withCredentials = true

//cấu hình intercepter


export default authorizeAxiosInstance