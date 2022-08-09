const router = require('express').Router()

const Blog = require('../models/blog')

router.get('/', async (request, response) => {
  const notes = await Blog.find({})
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(notes)
})

router.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user
  const blog = new Blog({ ...request.body, user: user.id })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

router.post('/:id/comments', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(204).end()
  }

  const comment = req.body.comment
  const commentedBlog = {
    ...blog.toObject(),
    comments: blog.comments.concat(comment),
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    commentedBlog,
    { new: true }
  ).populate('user', { username: 1, name: 1 })

  res.json(updatedBlog)
})

router.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(204).end()
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== request.user.id) {
    return response.status(401).json({
      error: 'only the creator can delete a blog',
    })
  }

  await Blog.findByIdAndRemove(request.params.id)

  response.status(201).json(blogToDelete)
})

router.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  }).populate('user', { username: 1, name: 1 })

  response.json(updatedBlog)
})

module.exports = router
