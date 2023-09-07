const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
    try {
        const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });

        response.json(users);
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' });
    }
});



usersRouter.post('/', async (request, response) => {
    const body = request.body;

    if (!body.username) {
        return response.status(400).json({ error: 'Username are required.' });
    }

    const existingUser = await User.findOne({ username: body.username });

    if (existingUser) {
        return response.status(400).json({ error: 'Username already exists.' });
    }


    const saltRounds = 10;
    const password = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        username: body.username,
        name: body.name,
        password,
    });

    const savedUser = await user.save();

    response.json(savedUser);
});

module.exports = usersRouter;