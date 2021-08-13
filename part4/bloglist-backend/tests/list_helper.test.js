const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns one', () => {
	const result = listHelper.dummy(testHelper.emptyList)
	expect(result).toBe(1)
})

describe('total likes', () => {
	test('of empty list is zero', () => {
		const result = listHelper.totalLikes(testHelper.emptyList)
		expect(result).toBe(0)
	})

	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(testHelper.listWithOneBlog)
		expect(result).toBe(5)
	})

	test('of a bigger list is calculated right', () => {
		const result = listHelper.totalLikes(testHelper.blogs)
		expect(result).toBe(36)
	})
})

describe('favourite blog', () => {
	test('of an empty list is zero', () => {
		const result = listHelper.favouriteBlog(testHelper.emptyList)
		expect(result).toEqual(0)
	})

	test('of a single blog is that blog itself', () => {
		const result = listHelper.favouriteBlog(testHelper.listWithOneBlog)
		expect(result).toEqual(testHelper.listWithOneBlog[0])
	})

	test('of many blogs is the one with most likes', () => {
		const result = listHelper.favouriteBlog(testHelper.blogs)
		expect(result).toEqual(testHelper.blogs[2])
	})
})
