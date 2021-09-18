import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { getAllUsers } from '../reducers/userReducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(({ user }) => user.usersList)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  if (!users.length) return null

  return (
    <div>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <TableData>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableData>
              <TableData>{user.blogs.length}</TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

const Table = styled.table`
  border-collapse: collapse;
  margin-top: 1.5em 0;
`

const TableData = styled.td`
  text-align: center;
`
export default Users
