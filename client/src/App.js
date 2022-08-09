import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

import BlogView from './views/BlogsView'
import UserView from './views/UsersView'
import AuthorView from './views/AuthorView'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'
import Blog from './components/Blog'

import blogService from './services/blogs'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(46, 213, 115);
  height: 100vh;
`

const App = () => {
  const [users, setUsers] = useState(null)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    axios.get('/api/users').then(response => setUsers(response.data))

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [])

  return (
    <Container>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<div></div>} />
            <Route path="/blogs" element={<BlogView />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users" element={<UserView users={users} />} />
            <Route path="/users/:id" element={<AuthorView users={users} />} />
          </Routes>
        </>
      )}
    </Container>
  )
}

export default App
