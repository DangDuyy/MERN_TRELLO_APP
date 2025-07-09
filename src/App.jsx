import { Routes, Route, Navigate } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from './pages/404'

function App() {
  return (
    <Routes>
      {/* redirect route */}
      <Route path='/' element={
        //ở đây cần replace giá trị true để nó thay thế route /, có thể hiểu là route/ sẽ không còn nằm trong history của browser
        //thực hành để hiểu hơn bằng cách go home từ trang 404 xong thử quay lại bằng nút back của trình duyệt giữa 2 trường hợp có và không có replace
        <Navigate to="/boards/6861f8ec46d5cb5cdb103bb9" replace={true}/>
      } />
      {/* // react route dom board */}
      <Route path='/boards/:boardId' element={ <Board/> }/>

      {/* Page not found */}
      <Route path='*' element={<NotFound/>} />
    </ Routes>
  )
}

export default App