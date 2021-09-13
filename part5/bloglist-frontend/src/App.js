import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const blogAppUser = window.localStorage.getItem('blogAppUser')
    if (blogAppUser) {
      const user = JSON.parse(blogAppUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      notifyWith(`${user.name} logged in`)
    } catch (err) {
      console.log(err)
      notifyWith('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('blogAppUser')
  }

  const handleCreateBlog = async blogObject => {
    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      notifyWith(`a new blog ${blog.title} by ${blog.author} was added`)
    } catch (err) {
      console.log(err)
      notifyWith('blog was not created', 'error')
    }
  }

  const handleRemoveBlog = async id => {
    const blogToDelete = blogs.find(blog => blog.id === id)

    const confirmRemoval = window.confirm(
      `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
    )

    if (confirmRemoval) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        notifyWith(
          `${blogToDelete.title} by ${blogToDelete.author} was removed`
        )
      } catch (err) {
        console.log(err)
        notifyWith('blog was not removed', 'error')
      }
    }
  }

  const handleUpdateBlog = async id => {
    const blogToUpdate = blogs.find(blog => blog.id === id)

    const blog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      user: blogToUpdate.user.id,
      likes: blogToUpdate.likes += 1,
    }

    try {
      const updatedBlog = await blogService.update(id, blog)
      notifyWith(
        `${updatedBlog.title} by ${updatedBlog.author} was updated`
      )
    } catch (err) {
      console.log(err)
      notifyWith('blog was not removed', 'error')
    }
  }

  const sortedBlog = blogs.sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notifcation={notification} />
        <Togglable buttonLabel='log in'>
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notifcation={notification} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </p>

      <Togglable buttonLabel='create new blog'>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      {sortedBlog.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleRemoveBlog={handleRemoveBlog}
          handleUpdateBlog={handleUpdateBlog}
        />
      )}
    </div>
  )
}

export default App
