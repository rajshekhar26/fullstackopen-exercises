const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.value
    default:
      return state
  }
}

export const setFilter = value => ({
  value,
  type: 'SET_FILTER'
})

export default filterReducer
