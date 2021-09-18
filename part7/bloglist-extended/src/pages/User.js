import { useSelector } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

const User = () => {
  const users = useSelector(({ user }) => user.usersList)
  const match = useRouteMatch('/users/:userId')

  const user = match ? users.find((u) => u.id === match.params.userId) : null

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <Heading3>Blogs added -</Heading3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Heading3 = styled.h3`
  margin: 1em 0;
`

export default User
