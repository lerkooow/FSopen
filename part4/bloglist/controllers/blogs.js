const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (!body.title || !body.url) {
        return response.status(400).json({ error: 'Title and URL are required' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
    })

    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id

    try {
        const deletedBlog = await Blog.findByIdAndRemove(id)

        if (!deletedBlog) {
            return response.status(404).json({ error: 'Blog not found' })
        }

        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const id = request.params.id
    const body = request.body

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true })

        if (!updatedBlog) {
            return response.status(404).json({ error: 'Blog not found' })
        }

        response.json(updatedBlog)
    } catch (exception) {
        next(exception)
    }
})


module.exports = blogsRouter;
