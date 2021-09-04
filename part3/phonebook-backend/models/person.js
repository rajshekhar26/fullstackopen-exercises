const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	// eslint-disable-next-line no-unused-vars
	.then(result => console.log('connected to MongoDB'))
	.catch(error => console.log('error connecting to MongoDB', error.message))

mongoose.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minLength: 3,
	},
	number: {
		type: String,
		required: true,
		minLength: 8,
	},
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)
