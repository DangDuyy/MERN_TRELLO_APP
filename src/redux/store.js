import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'
import { activeCardReducer } from './activeCard/activeCardSlice'
//cau hinh redux-persist
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' //default la local storage

//cau hinh persist
const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: 'user' //day la cho pheo SLICE USER se duoc luu vao local storage qua moi lan F5
}

//combine cac reducer vao 1 bien
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer,
  activeCard: activeCardReducer
})

//thuc hien persist reducer
const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  //fix bug warning do khong tuong thich
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

