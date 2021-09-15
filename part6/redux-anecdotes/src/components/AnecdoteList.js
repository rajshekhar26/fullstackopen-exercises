import { useSelector, useDispatch } from 'react-redux'

import { setVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return sortedAnecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button
          onClick={() => dispatch(setVote(anecdote.id))}
        >vote
        </button>
      </div>
    </div>
  )
}

export default AnecdoteList
