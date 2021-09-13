import { useState } from 'react'

const Blog = ({ blog, user, handleRemoveBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {
        showDetails ? (
          <>
            <div>{blog.url}</div>
            <div>
              likes {blog.likes}
              <button>like</button>
            </div>
            <div>{blog.author}</div>
            {
              blog.user.username === user.username &&
              <button
                onClick={() => handleRemoveBlog(blog.id)}
              >remove
              </button>
            }
          </>
        ) : null
      }
    </div>
  )
}

export default Blog
