/* eslint-disable no-console */
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MailIcon from '@mui/icons-material/Mail'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'
import { selectCurrentUser, updateUserAPI } from '~/redux/user/userSlice'
import { FIELD_REQUIRED_MESSAGE, singleFileValidator } from '~/utils/validators'

// Xử lý custom đẹp cái input file ở đây: https://mui.com/material-ui/react-button/#file-upload
// Ngoài ra note thêm lib này từ docs của MUI nó recommend nếu cần dùng: https://github.com/viclafouch/mui-file-input

function AccountTab() {
  const currentUser = useSelector(selectCurrentUser)

  const dispatch = useDispatch()

  // Những thông tin của user để init vào form (key tương ứng với register phía dưới Field)
  const initialGeneralForm = {
    displayName: currentUser?.displayName
  }
  // Sử dụng defaultValues để set giá trị mặc định cho các field cần thiết
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialGeneralForm
  })

  const submitChangeGeneralInformation = (data) => {
    const { displayName } = data
    // console.log('displayName: ', displayName)

    // Nếu không có sự thay đổi gì về displayname thì không làm gì cả
    if (displayName === currentUser?.displayName) return

    // Gọi API...
    toast.promise(
      dispatch(updateUserAPI( { displayName })),
      { pending: 'Updating...' }
    ).then( res => {
      if (!res.error) {
        toast.success('User updated successfully!')
      }
    })
  }

  const uploadAvatar = (e) => {
    // Lấy file thông qua e.target?.files[0] và validate nó trước khi xử lý
    console.log('e.target?.files[0]: ', e.target?.files[0])
    const error = singleFileValidator(e.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }

    // Sử dụng FormData để xử lý dữ liệu liên quan tới file khi gọi API
    let reqData = new FormData()
    reqData.append('avatar', e.target?.files[0])
    // Cách để log được dữ liệu thông qua FormData
    console.log('reqData: ', reqData)
    for (const value of reqData.values()) {
      console.log('reqData Value: ', value)
    }

    // Gọi API...
    toast.promise(
      dispatch(updateUserAPI( reqData )),
      { pending: 'Updating...' }
    ).then( res => {
      if (!res.error) {
        toast.success('Updated user successfully!')
      }
      //luu y,du co loi hay thanh cong thi cung phai clear gia tri cua file input, neu khong thi se khong the chon cung 1 file lien tiep duoc
      e.target.value = ''
    }
    )
  }

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Box sx={{
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box>
            <Avatar
              sx={{ width: 84, height: 84, mb: 1 }}
              alt="TrungQuanDev"
              src={currentUser?.avatar}
            />
            <Tooltip title="Upload a new image to update your avatar immediately.">
              <Button
                component="label"
                variant="contained"
                size="small"
                startIcon={<CloudUploadIcon />}>
                Upload
                <VisuallyHiddenInput type="file" onChange={uploadAvatar} />
              </Button>
            </Tooltip>
          </Box>
          <Box>
            <Typography variant="h6">{currentUser?.displayName}</Typography>
            <Typography sx={{ color: 'grey' }}>@{currentUser?.username}</Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(submitChangeGeneralInformation)}>
          <Box sx={{ width: '400px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <TextField
                disabled
                defaultValue={currentUser?.email}
                fullWidth
                label="Your Email"
                type="text"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box>
              <TextField
                disabled
                defaultValue={currentUser?.username}
                fullWidth
                label="Your Username"
                type="text"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBoxIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box>
              <TextField
                fullWidth
                label="Your Display Name"
                type="text"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentIndIcon fontSize="small" />
                    </InputAdornment>
                  )
                }}
                {...register('displayName', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
                error={!!errors['displayName']}
              />
              <FieldErrorAlert errors={errors} fieldName={'displayName'} />
            </Box>

            <Box>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                color="primary"
                fullWidth>
                Update
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default AccountTab
