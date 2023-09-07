const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user'); // Import the User model


blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

        response.json(blogs);
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' });
    }
});

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body;

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
            user: user._id, // Связываем блог с пользователем
            likes: body.likes === undefined ? 0 : body.likes,
        });

        const savedBlog = await blog.save();

        // Добавляем блог к списку блогов пользователя
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
