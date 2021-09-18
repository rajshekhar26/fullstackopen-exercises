import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

import { updateBlog } from '../reducers/blogsReducer'
import { Button } from '../GlobalStyle'
import styled from 'styled-components'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const match = useRouteMatch('/blogs/:blogId')

  const [comment, setComment] = useState('')

  const blog = match ? blogs.find((b) => b.id === match.params.blogId) : null

  const handleLikeBlog = () => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: (blog.likes += 1),
    }
    dispatch(updateBlog(newBlog))
  }

  const handleComment = () => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      comments: blog.comments.concat(comment),
    }
    dispatch(updateBlog(newBlog))
    setComment('')
  }

  if (!blog) return null

  return (
    <div>
      <Heading2>
        {blog.title} - {blog.author}
      </Heading2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <BlogLikes>
        {blog.likes} likes{' '}
        <Button primary onClick={handleLikeBlog}>
          Like
        </Button>
      </BlogLikes>
      <div>Added by {blog.user.name}</div>
      <Heading3>Comments</Heading3>
      <CommentList>
        {blog.comments.map((comment) => (
          <CommentItem key={Math.random() * 1000}>{comment}</CommentItem>
        ))}
      </CommentList>
      <div>
        <input
          type='text'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button primary onClick={handleComment}>
          Add Comment
        </Button>
      </div>
    </div>
  )
}

const BlogLikes = styled.div`
  margin: 1.5em 0;
`

const Heading2 = styled.h2`
  margin-bottom: 0.5em;
`
const Heading3 = styled.h3`
  margin-top: 1.5em;
`

const CommentList = styled.ul`
  margin: 1em 0;
`
const CommentItem = styled.li`
  margin: 0.2em 0;
`

export default Blog
