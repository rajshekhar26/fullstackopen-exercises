import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Blog = ({ blog }) => {
  // const user = useSelector(({ user }) => user.currentUser);

  // const handleRemoveBlog = (blog) => {
  //   const confirmRemoval = window.confirm(
  //     `Remove blog ${blog.title} by ${blog.author}`
  //   );
  //   confirmRemoval && dispatch(removeBlog(blog.id));
  // };

  return (
    <BlogStyle className='blogs'>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </BlogStyle>
  )
}

const BlogStyle = styled.div`
  margin: 1em 0;
  padding: 0.7em 1em;
  background-color: #eee;
  border-radius: 5px;
`

export default Blog
