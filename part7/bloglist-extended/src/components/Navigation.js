import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Button } from '../GlobalStyle'
import { removeUser } from '../reducers/userReducer'

const Navigation = () => {
  const currentUser = useSelector(({ user }) => user.currentUser)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(removeUser())
  }

  return (
    <Header>
      <NavWrapper>
        <Navbar>
          <h2>Blog App</h2>
          <NavList>
            <NavItem>
              <NavLink to='/'>Blogs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/users'>Users</NavLink>
            </NavItem>
          </NavList>
        </Navbar>
        {currentUser ? (
          <p>
            {currentUser.name} logged in{' '}
            <Button className='btn-logout' onClick={handleLogout}>
              Logout
            </Button>
          </p>
        ) : (
          <NavLink to='/login'>Login</NavLink>
        )}
      </NavWrapper>
    </Header>
  )
}

const Header = styled.header`
  background-color: royalblue;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

const NavWrapper = styled.div`
  width: 1200px;
  max-width: 95%;
  margin: 0 auto;
  height: 6em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.3em;
`

const NavList = styled.ul`
  display: flex;
  margin-left: 1em;
`

const NavItem = styled.li`
  margin-right: 0.5em;
`

const NavLink = styled(Link)`
  color: white;
`

export default Navigation
