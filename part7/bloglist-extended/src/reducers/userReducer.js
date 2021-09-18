import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

const initialState = {
  usersList: [],
  currentUser: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload }
    case 'GET_ALL_USERS':
      return { ...state, usersList: action.payload }
    default:
      return state
  }
}

export const setExistingUser = () => {
  const blogAppUser = window.localStorage.getItem('blogAppUser')
  let user = null

  if (blogAppUser) {
    user = JSON.parse(blogAppUser)
    blogService.setToken(user.token)
  }

  return {
    type: 'SET_USER',
    payload: user,
  }
}

export const setUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      dispatch({
        type: 'SET_USER',
        payload: user,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      dispatch(setNotification(`${user.name} logged in`, 5))
    } catch (err) {
      console.log(err.response)
      dispatch(setNotification('Wrong username or password', 5, 'error'))
    }
  }
}

export const removeUser = () => {
  window.localStorage.removeItem('blogAppUser')
  return {
    type: 'SET_USER',
    payload: null,
  }
}

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'GET_ALL_USERS',
      payload: users,
    })
  }
}

export default userReducer
