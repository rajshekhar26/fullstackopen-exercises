const notificationReducer = (state = 'Test notification', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    default:
      return state
  }
}

export const setNotification = message => ({
  message,
  type: 'SET_NOTIFICATION'
})

export default notificationReducer
