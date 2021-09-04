require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.static('build'))
app.use(express.json())

// eslint-disable-next-line no-unused-vars
morgan.token('body', (request, response) => JSON.stringify(request.body))
const logger = morgan((tokens, request, response) =>
	[
		tokens.method(request, response),
		tokens.url(request, response),
		tokens.status(request, response),
		tokens.res(request, response, 'content-length'),
		'-',
		tokens['response-time'](request, response),
		'ms',
		request.method === 'POST' ? tokens.body(request, response) : null,
	].join(' ')
)

app.use(logger)

// eslint-disable-next-line no-unused-vars
app.get('/', (request, response) => {
	response.send('<h1>Hello World</h1>')
})

// eslint-disable-next-line no-unused-vars
app.get('/info', (request, response) => {
	response.send(
		// `<p>Phonebook has info for ${persons.length} people</p>
		`<p>${new Date()}</p>`
	)
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(person => response.json(person))
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(returnedPerson => {
			if (returnedPerson) {
				response.json(returnedPerson)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		// eslint-disable-next-line no-unused-vars
		.then(result => response.status(204).end())
		.catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {
	const body = request.body

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person
		.save()
		.then(returnedPerson => response.json(returnedPerson))
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body
	const note = {
		name: body.name,
		number: body.number,
	}

	Person.findByIdAndUpdate(request.params.id, note, {
		new: true,
		runValidators: true,
	})
		.then(updatedPerson => response.json(updatedPerson))
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.log(error.message)
	if (error.name === 'CastError') {
		response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		response.status(400).send({ error: error.message })
	}
	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
