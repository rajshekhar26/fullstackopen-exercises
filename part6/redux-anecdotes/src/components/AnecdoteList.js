import { useDispatch, useSelector } from 'react-redux'

import { setVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes }) => anecdotes)
  const filterValue = useSelector(({ filter }) => filter)
  const dispatch = useDispatch()

  const handleVote = anecdote => {
    dispatch(setVote(anecdote.id))
    dispatch(setNotification(`you voted ${anecdote.content}`))
    setTimeout(() => dispatch(setNotification(null)), 5000)
  }

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  const filteredAnecdotes = sortedAnecdotes.filter(anecdote => (
    anecdote.content.toLowerCase().includes(filterValue)
  ))

  return filteredAnecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button
          onClick={() => handleVote(anecdote)}
        >vote
        </button>
      </div>
    </div>
  )
}

export default AnecdoteList
