const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_VOTE':
      const id = action.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anecdote =>
        anecdote.id === changedAnecdote.id ? changedAnecdote : anecdote
      )
    case 'SET_ANECDOTE':
      return [...state, action.data]
    case 'GET_ANECDOTE':
      return action.data
    default:
      return state
  }
}

export const setVotes = id => ({
  id,
  type: 'SET_VOTE'
})

export const setAnecdote = data => ({
  data,
  type: 'SET_ANECDOTE'
})

export const getAnecdotes = data => ({
  data,
  type: 'GET_ANECDOTE'
})

export default reducer
