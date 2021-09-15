import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_VOTE':
      return state.map(anecdote =>
        anecdote.id === action.anecdote.id ? action.anecdote : anecdote
      )
    case 'SET_ANECDOTE':
      return [...state, action.anecdote]
    case 'GET_ANECDOTE':
      return action.data
    default:
      return state
  }
}

export const setVotes = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type: 'SET_VOTE',
      anecdote: updatedAnecdote
    })
  }
}

export const setAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(content)
    dispatch({
      anecdote,
      type: 'SET_ANECDOTE'
    })

  }
}

export const getAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      data: anecdotes,
      type: 'GET_ANECDOTE'
    })
  }
}

export default reducer
