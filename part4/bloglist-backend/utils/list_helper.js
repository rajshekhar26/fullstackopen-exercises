const dummy = blogs => {
	return 1
}

const totalLikes = blogs => {
	if (!blogs.length) return 0
	return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = blogs => {
	if (!blogs.length) return 0
	const likes = blogs.map(blog => blog.likes)
	const mostLikedIndex = likes.indexOf(Math.max(...likes))
	return blogs[mostLikedIndex]
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
}
