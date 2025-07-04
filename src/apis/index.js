import axios from 'axios'
import { API_ROOT } from '~/utils/constants'


//board
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  //axios tra ve
  return response.data
}

//board
export const updateBoardDetailsAPI = async (boardId, updateData ) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  //axios tra ve
  return response.data
}
//board
export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving-card`, updateData)
  //axios tra ve
  return response.data
}
//board
export const deleteColumnDetailAPI = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  //axios tra ve
  return response.data
}

//column
export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}
//column
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData )
  return response.data
}

//card
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}