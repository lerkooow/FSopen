const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user');
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 });

    response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body;

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const users = await User.findById(decodedToken.id)

    if (!body.title || !body.url || !body.user) {
        return response.status(400).json({ error: 'Title, URL, and User are required' });
    }

    try {
        const user = await User.findOne({ username: body.user });

        if (!user) {
            return response.status(400).json({ error: 'User not found' });
        }

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            user: user._id,
            likes: body.likes === undefined ? 0 : body.likes,
        });

        const savedBlog = await blog.save();

        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        response.status(201).json(savedBlog);

    } catch (exception) {
        next(exception);
    }
});

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
