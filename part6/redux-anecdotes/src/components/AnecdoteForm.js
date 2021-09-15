import { connect } from 'react-redux'

import { setAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const addNew = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.setAnecdote(content)
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

const ConnectAnecdoteForm = connect(null, { setAnecdote })(AnecdoteForm)

export default ConnectAnecdoteForm
