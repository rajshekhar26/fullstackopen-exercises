const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.blogs)
})

describe('when there is initally some blogs saved', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.blogs.length)
	})

	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs')

		const titles = response.body.map(blog => blog.title)
		expect(titles).toContain('React patterns')
	})
})

describe('returned blog list', () => {
	test('contain id', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body[0].id).toBeDefined()
	})

	test('does not contain _id', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body[1]._id).toBeUndefined()
	})
})

describe('viewing a specific blog', () => {
	test('succeeds with a valid id', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToView = blogsAtStart[0]

		const resultBlog = await api
			.get(`/api/blogs/${blogToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
		expect(resultBlog.body).toEqual(processedBlogToView)
	})

	test('fails with status code 404 if blog does not exist', async () => {
		const validNonexistingId = await helper.nonExistingId()

		await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
	})

	test('fails with status code 400 id is invalid', async () => {
		const invalidId = '5a3d5da59070081a82a3445'

		await api.get(`/api/blogs/${invalidId}`).expect(400)
	})
})
describe('addition of a new blog', () => {
	test('succeeds with valid data', async () => {
		const newBlog = {
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
			likes: 5,
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)

		const titles = blogsAtEnd.map(blog => blog.title)
		expect(titles).toContain('TDD harms architecture')
	})

	test('succeeds even if likes is missing and defaults likes to 0', async () => {
		const newBlog = {
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)

		const titles = blogsAtEnd.map(blog => blog.title)
		expect(titles).toContain('TDD harms architecture')
	})

	test('fails with status code 400 if title and url are missing', async () => {
		const newBlog = { likes: 0 }
		await api.post('/api/blogs').send(newBlog).expect(400)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.blogs.length)
	})
})

afterAll(() => {
	mongoose.connection.close()
})
