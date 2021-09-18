import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogsReducer = (state = [], action) => {
  const { type, payload } = action

  switch (type) {
    case 'GET_ALL_BLOGS':
      return payload
    case 'SET_BLOG':
      return state.concat(payload)
    case 'REMOVE_BLOG':
      return state.filter((b) => b.id !== payload.id)
    case 'UPDATE_BLOG': {
      return state.map((blog) => (blog.id === payload.id ? payload : blog))
    }
    default:
      return state
  }
}

export const getAllBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'GET_ALL_BLOGS',
        payload: blogs,
      })
    } catch (err) {
      console.log(err)
      dispatch(setNotification('Could not fetch blogs', 5, 'error'))
    }
  }
}

export const createBlog = (newObject) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create(newObject)
      console.log(blog)
      dispatch({
        type: 'SET_BLOG',
        payload: blog,
      })
      dispatch(
        setNotification(
          `A new blog ${blog.title} by ${blog.author} was added`,
          5
        )
      )
    } catch (err) {
      console.log(err)
      dispatch(setNotification('Blog was not created', 5, 'error'))
    }
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        payload: { id },
      })
      dispatch(setNotification('Blog was removed successfully', 5))
    } catch (err) {
      console.log(err)
      dispatch(setNotification('Blog was not removed', 5, 'error'))
    }
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog)
      dispatch({
        type: 'UPDATE_BLOG',
        payload: updatedBlog,
      })
      dispatch(
        setNotification(
          `${updatedBlog.title} by ${updatedBlog.author} was updated`,
          5
        )
      )
    } catch (err) {
      console.log(err)
      dispatch(setNotification('Unable to update blog', 5, 'error'))
    }
  }
}

export default blogsReducer
