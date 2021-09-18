import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { setUser } from '../reducers/userReducer'
import { Button } from '../GlobalStyle'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(setUser({ username, password }))
    history.push('/')
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type='text'
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        password
        <input
          type='password'
          id='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <Button primary className='btn-login' type='submit'>
        log in
      </Button>
    </form>
  )
}

export default LoginForm
