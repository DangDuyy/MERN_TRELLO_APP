import { toast } from 'react-toastify'

/**
 * Hiển thị toast error message từ API response
 * @param {Object} error - Error object từ API call
 * @param {string} defaultMessage - Message mặc định nếu không có error message từ API
 */
export const showApiError = (error, defaultMessage = 'An error occurred') => {
  let errorMessage = defaultMessage

  // Kiểm tra các trường hợp error message từ API
  if (error?.response?.data?.message) {
    // Backend trả về message trong response.data.message
    errorMessage = error.response.data.message
  } else if (error?.response?.data?.error) {
    // Backend trả về error trong response.data.error
    errorMessage = error.response.data.error
  } else if (error?.message) {
    // Error message từ axios hoặc network error
    errorMessage = error.message
  } else if (typeof error === 'string') {
    // Error là string
    errorMessage = error
  }

  toast.error(errorMessage)
  return errorMessage
}

/**
 * Hiển thị toast success message
 * @param {string} message - Success message
 */
export const showApiSuccess = (message) => {
  toast.success(message)
}

/**
 * Hiển thị toast warning message
 * @param {string} message - Warning message
 */
export const showApiWarning = (message) => {
  toast.warning(message)
}

/**
 * Hiển thị toast info message
 * @param {string} message - Info message
 */
export const showApiInfo = (message) => {
  toast.info(message)
}

/**
 * Handle error cho Redux asyncThunk
 * @param {Object} res - Response từ Redux asyncThunk
 * @param {string} defaultMessage - Message mặc định
 */
export const handleReduxError = (res, defaultMessage = 'Operation failed') => {
  if (res.error) {
    const errorMessage = res.error.message || res.payload?.message || defaultMessage
    toast.error(errorMessage)
    return errorMessage
  }
  return null
}