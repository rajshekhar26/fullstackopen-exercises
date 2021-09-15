const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    default:
      return state
  }
}

let getTimeout = null

export const setNotification = (message, timeout) => {
  return async dispatch => {
    clearTimeout(getTimeout)

    dispatch({
      message,
      type: 'SET_NOTIFICATION'
    })

    getTimeout = setTimeout(() => {
      dispatch({
        message: null,
        type: 'SET_NOTIFICATION',
      })
    }, timeout * 1000)
  }
}

export default notificationReducer
