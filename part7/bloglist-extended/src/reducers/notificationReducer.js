const initialState = {
  message: null,
  status: 'success',
}

const notifcationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    default:
      return state
  }
}

let getTimeout = null

export const setNotification = (message, timeout, status = 'success') => {
  clearTimeout(getTimeout)

  return async (dispatch) => {
    dispatch({
      payload: { message, status },
      type: 'SET_NOTIFICATION',
    })

    getTimeout = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { initialState },
      })
    }, timeout * 1000)
  }
}

export default notifcationReducer
