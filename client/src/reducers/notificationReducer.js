import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      if (action.payload === null) return null

      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    },
  },
})

export const { setNotification } = notificationSlice.actions

let timeoutID = null

export const addNotification = (notification, time) => {
  return dispatch => {
    dispatch(setNotification(notification))

    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    time = time === undefined ? 5 : time

    timeoutID = setTimeout(() => {
      dispatch(setNotification(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
