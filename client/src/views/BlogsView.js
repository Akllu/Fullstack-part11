import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'

const Header = styled.h1`
  text-align: center;
`

const SingleBlogLink = styled(Link)`
  display: flex;
  align-self: center;
  color: black;
  text-decoration: none;
  font-size: 24px;

  &:hover {
    transition: all 0.2s ease-in-out;
    text-decoration: underline;
  }
`

const Blogs = () => {
  const blogFormRef = useRef()
  const blogs = useSelector(state => state.blogs)

  return (
    <>
      <Header>Blogs</Header>
      <Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
        <BlogForm toggle={() => blogFormRef.current.toggleVisibility()} />
      </Togglable>
      {blogs.map(blog => (
        <SingleBlogLink to={`/blogs/${blog.id}`} key={blog.id}>
          {blog.title}
        </SingleBlogLink>
      ))}
    </>
  )
}

export default Blogs
