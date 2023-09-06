const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(user => user.toJSON()))
})

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
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
});

module.exports = usersRouter;