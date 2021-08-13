const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request.token = authorization.substring(7)
	}
	next()
}

const userExtractor = (request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	request.user = User.findById(decodedToken)
	next()
}

const unknownEndpoint = (request, response) => {
	return response.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)
	if (error.name === 'CastError') {
		return response.status(400).json({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({ error: 'invalid token' })
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({ error: 'token expired' })
		next(error)
	}
}

module.exports = {
	tokenExtractor,
	userExtractor,
	unknownEndpoint,
	errorHandler,
}
