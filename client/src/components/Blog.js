import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { voteBlog, removeBlog, setBlogs } from '../reducers/blogReducer'
import { useMatch } from 'react-router-dom'
import { useField } from '../hooks'
import axios from 'axios'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
`

const Link = styled.a``

const LikeSection = styled.div`
  padding: 10px;
`

const LikeButton = styled.button`
  background: rgb(20, 142, 240);
  border-radius: 5;
  margin-left: 15px;
  padding: 5px 15px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
`

const DeleteButton = styled.button`
  background: rgb(220, 42, 20);
  border-radius: 5;
  margin-top: 15px;
  padding: 5px 15px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
`

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const comment = useField('comment')

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(b => b.id === match.params.id) : null

  if (!blog) return null

  const likeBlog = blog => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    dispatch(voteBlog(likedBlog))
  }

  const deleteBlog = blog => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )
    if (confirm) {
      dispatch(removeBlog(blog))
    }
  }

  const addComment = e => {
    e.preventDefault()
    axios
      .post(`/api/blogs/${blog.id}/comments`, { comment: comment.input.value })
      .then(res => {
        dispatch(setBlogs(blogs.map(b => (b.id !== blog.id ? b : res.data))))
      })
      .catch(err => console.error(err))

    comment.resetField()
  }

  return (
    <Container>
      <h1>{blog.title}</h1>
      <Link href={blog.url}>{blog.url}</Link>
      <LikeSection>
        Likes {blog.likes}
        <LikeButton onClick={() => likeBlog(blog)}>Like</LikeButton>
      </LikeSection>
      {`Added by ${blog.author}`}
      {blog.user.username === user.username && (
        <DeleteButton onClick={() => deleteBlog(blog)}>Remove</DeleteButton>
      )}
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <div>
          <input {...comment.input} placeholder="Leave a comment" />
        </div>
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </Container>
  )
}

export default Blog
