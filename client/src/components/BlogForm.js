import React from 'react'
// import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'

const BlogForm = ({ toggle }) => {
  const title = useField('title')
  const author = useField('author')
  const url = useField('url')
  const likes = useField('likes')
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()

    const newBlog = {
      title: title.input.value,
      author: author.input.value,
      url: url.input.value,
      likes: likes.input.value,
    }
    dispatch(createBlog(newBlog))
    dispatch(
      addNotification({
        message: `A new blog ${title.input.value} by ${author.input.value} added!`,
        type: 'success',
      })
    )
    toggle()
    title.resetField()
    author.resetField()
    url.resetField()
    likes.resetField()
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input {...title.input} placeholder="Enter a title" />
        </div>
        <div>
          Author:
          <input {...author.input} placeholder="Enter a author" />
        </div>
        <div>
          URL:
          <input {...url.input} placeholder="Enter a URL" />
        </div>
        <div>
          Likes:
          <input {...likes.input} placeholder="Enter likes" type="number" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

// BlogForm.propTypes = {
//   createBlog: PropTypes.func.isRequired,
// }

export default BlogForm
