import { useDispatch } from 'react-redux'

import { setAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const anecdote = await anecdoteService.create(content)
    dispatch(setAnecdote(anecdote))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}


export default AnecdoteForm
