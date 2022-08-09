import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => (a.likes < b.likes ? 1 : -1))
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    addLike(state, action) {
      const id = action.payload.id
      const blogToChange = state.find(b => b.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state.map(blog => (blog.id !== id ? blog : changedBlog))
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload.id)
    },
  },
})

export const { setBlogs, addBlog, addLike, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
  }
}

export const voteBlog = blog => {
  return async dispatch => {
    const votedBlog = await blogService.update(blog)
    dispatch(addLike(votedBlog))
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    const removedBlog = await blogService.remove(blog.id)
    dispatch(deleteBlog(removedBlog))
  }
}

export default blogSlice.reducer
