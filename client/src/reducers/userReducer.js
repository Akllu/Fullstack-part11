import { createSlice } from '@reduxjs/toolkit'
import { addNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(
        addNotification({ message: `Welcome ${user.name}!`, type: 'success' })
      )
    } catch (exception) {
      dispatch(
        addNotification({
          message: 'Wrong username or password!',
          type: 'error',
        })
      )
    }
  }
}

export const logOut = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    dispatch(addNotification({ message: 'You logged out!', type: 'success' }))
    dispatch(setUser(null))
  }
}

export default userSlice.reducer
