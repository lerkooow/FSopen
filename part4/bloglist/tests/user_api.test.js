const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
})

describe('User API Tests', () => {
    test('Creating a new user', async () => {
        const newUser = {
            username: 'testuser',
            password: 'password123',
            name: 'Test User',
        }

        const response = await api.post('/api/users').send(newUser)

        expect(response.status).toBe(201)
        expect(response.body.username).toBe(newUser.username)

        const users = await User.find({})
        expect(users).toHaveLength(1)
    })

    test('Retrieving user details', async () => {
        const testUsers = [
            {
                username: 'user1',
                password: 'password1',
                name: 'User One',
            },
            {
                username: 'user2',
                password: 'password2',
                name: 'User Two',
            },
        ]
        await User.insertMany(testUsers)

        const response = await api.get('/api/users')

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(testUsers.length)
        expect(response.body[0].passwordHash).toBeUndefined()
    })
})