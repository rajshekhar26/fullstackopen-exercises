import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

import UsersPage from './pages/Users'
import UserPage from './pages/User'
import BlogPage from './pages/Blog'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { setExistingUser } from './reducers/userReducer'
import { getAllBlogs } from './reducers/blogsReducer'
import styled from 'styled-components'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(({ blogs }) => blogs)
  const currentUser = useSelector(({ user }) => user.currentUser)

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [])

  useEffect(() => {
    dispatch(setExistingUser())
  }, [])

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Navigation />
      <Main>
        <Notification />

        <Switch>
          <Route path='/users/:userId' exact>
            <UserPage />
          </Route>

          <Route path='/users' exact>
            <UsersPage />
          </Route>

          <Route path='/blogs/:blogId' exact>
            {currentUser ? <BlogPage /> : <Redirect to='/login' />}
          </Route>

          <Route path='/' exact>
            {currentUser ? (
              <>
                <Togglable buttonLabel='New Blog'>
                  <BlogForm />
                </Togglable>

                {sortedBlogs.map((blog) => (
                  <Blog key={blog.id} blog={blog} />
                ))}
              </>
            ) : (
              <Redirect to='/login' />
            )}
          </Route>

          <Route path='/login' exact>
            {!currentUser ? (
              <Togglable buttonLabel='Log In'>
                <LoginForm />
              </Togglable>
            ) : (
              <Redirect to='/' />
            )}
          </Route>
        </Switch>
      </Main>
    </div>
  )
}

const Main = styled.main`
  margin-top: 7em;
`

export default App
