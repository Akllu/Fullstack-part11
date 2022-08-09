import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../reducers/userReducer'

const NavbarContainer = styled.div`
  display: flex;
  position: sticky;
  background: rgb(123, 247, 159);
  height: 80px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  top: 0;
  z-index: 1;
`

const LinkContainer = styled.div`
  display: flex;
  margin-left: 15px;
`

const NavLink = styled(Link)`
  display: flex;
  color: rgb(35, 35, 35);
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
  font-family: Verdana, Geneva, sans-serif;
  letter-spacing: 1px;
  font-variant: small-caps;
  font-style: italic;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: black;
    font-size: 120%;
  }
`

const UserInfo = styled.div`
  padding: 10px;
`

const Button = styled.button`
  border-radius: 50px;
  background: rgb(0, 0, 0);
  padding: 10px 22px;
  color: white;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-left: 15px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: white;
    color: black;
  }
`

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return (
    <NavbarContainer>
      <LinkContainer>
        <NavLink to="/blogs">Blogs</NavLink>
        <NavLink to="/users">Users</NavLink>
      </LinkContainer>
      <UserInfo>
        {user.name} logged in
        <Button onClick={() => dispatch(logOut())}>Logout</Button>
      </UserInfo>
    </NavbarContainer>
  )
}

export default Navbar
