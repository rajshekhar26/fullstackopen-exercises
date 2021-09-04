const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log(
		'Please provide a password as an argument: node mongo.js <password>'
	)
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.svjiw.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
	Person.find({}).then(persons => {
		persons.forEach(person => console.log(person))
		mongoose.connection.close()
	})
} else if (process.argv.length === 5) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	})

	person.save().then(savedPerson => {
		console.log(
			`added ${savedPerson.name} number ${savedPerson.number} to phonebook`
		)
		mongoose.connection.close()
	})
}
