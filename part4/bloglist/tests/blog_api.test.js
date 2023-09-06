const listHelper = require("../utils/list_helper")

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


const listWithOneBlog = [
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go to statement considered harmful",
        author: "Edsger W. Dijkstra",
        url:
            "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
    },
]

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
            "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
    },
]

describe('Blog API Tests', () => {
    test('Blog posts have "id" property instead of "_id"', async () => {
        const response = await api.get('/api/blogs')

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(0)
        const blogs = response.body
        if (blogs.length > 0) {
            const firstBlog = blogs[0]
            expect(firstBlog.id).toBeDefined()
            expect(firstBlog._id).toBeUndefined()
        }
    })

    test('GET request to /api/blogs returns the correct number of blog posts in JSON format', async () => {
        const response = await api.get('/api/blogs')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toContain('application/json')

        const blogs = response.body
        expect(Array.isArray(blogs)).toBe(true)
    })
})

test('Creating a new blog post', async () => {
    const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://example.com/test',
        likes: 10,
    }

    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.status).toBe(201)
    expect(response.headers['content-type']).toContain('application/json')

    const blogs = await Blog.find({})
    expect(blogs).toHaveLength(initialBlogs.length + 1)

    const addedBlog = blogs.find((blog) => blog.title === newBlog.title)
    expect(addedBlog).toBeDefined()
    expect(addedBlog.author).toBe(newBlog.author)
    expect(addedBlog.url).toBe(newBlog.url)
    expect(addedBlog.likes).toBe(newBlog.likes)
})

test('Creating a new blog post with missing likes defaults to 0', async () => {
    const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://example.com/test',
    }

    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.status).toBe(201)
    expect(response.headers['content-type']).toContain('application/json')


    const addedBlog = await Blog.findById(response.body.id)
    expect(addedBlog.likes).toBe(0)
})

describe("total likes", () => {
    test("of empty list returns error", () => {
        const result = listHelper.totalLikes([])

        expect(result).toBe("Blog list is empty")
    })

    test("when list has only one blog, equals the likes of that", () => {
        const result = listHelper.totalLikes(listWithOneBlog)

        expect(result).toBe(5)
    })

    test("of a bigger list is calculated right", () => {
        const result = listHelper.totalLikes(blogs)

        expect(result).toBe(36)
    })
})

describe("favorite blog", () => {
    test("of empty list returns error", () => {
        const result = listHelper.favoriteBlog([])

        expect(result).toBe("Blog list is empty")
    })


    test("when list has only one blog, equals that blog", () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)

        expect(result).toMatchObject({
            title: "Go to statement considered harmful",
            author: "Edsger W. Dijkstra",
            likes: 5,
        })
    })

    test("of a bigger list is the one with most likes", () => {
        const result = listHelper.favoriteBlog(blogs)

        expect(result).toMatchObject({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        })
    })

    describe("most blogs", () => {
        test("of empty list returns error", () => {
            const result = listHelper.mostBlogs([])

            expect(result).toBe("Blog list is empty")
        })

        test("when list has only one blog, equals that author", () => {
            const result = listHelper.mostBlogs(listWithOneBlog)

            expect(result).toMatchObject({
                author: "Edsger W. Dijkstra",
                blogs: 1,
            })
        })

        test("of a bigger list is the author with the most blogs", () => {
            const result = listHelper.mostBlogs(blogs)

            expect(result).toMatchObject({
                author: "Robert C. Martin",
                blogs: 3,
            })
        })
    })

    describe.only("most likes", () => {
        test("of empty list returns error", () => {
            const result = listHelper.mostLikes([])

            expect(result).toBe("Blog list is empty")
        })

        test("when list has only one blog, equals that author", () => {
            const result = listHelper.mostLikes(listWithOneBlog)

            expect(result).toMatchObject({
                author: "Edsger W. Dijkstra",
                likes: 5,
            })
        })

        test("of a bigger list is the author with the most likes", () => {
            const result = listHelper.mostLikes(blogs)

            expect(result).toMatchObject({
                author: "Edsger W. Dijkstra",
                likes: 17,
            })
        })
    })
})