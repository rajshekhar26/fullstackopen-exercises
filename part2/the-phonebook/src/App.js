import React, { useEffect, useState } from 'react';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Person from './components/Person';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchVal, setSearchVal] = useState('');
	const [message, setMessage] = useState(null);

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleSearchValChange = (event) => {
		setSearchVal(event.target.value);
	};

	const filterdNames = persons.filter((person) => {
		return person.name.toLowerCase().includes(searchVal.toLowerCase());
	});

	const updatePerson = (id) => {
		let changedObject = { name: newName, number: newNumber };
		personService
			.update(id, changedObject)
			.then((returnedPerson) => {
				setPersons(
					persons.map((person) => (person.id === id ? returnedPerson : person))
				);
				setMessage(`Updated ${newName}`);
				setTimeout(() => setMessage(null), 3000);
			})
			.catch((error) => {
				setMessage(
					`Information of ${newName} has already been removed from server`
				);
				setTimeout(() => setMessage(null), 3000);
			});
	};

	const createPerson = () => {
		let changedObject = { name: newName, number: newNumber };
		personService.create(changedObject).then((returnedPersons) => {
			setPersons(persons.concat(returnedPersons));
			setMessage(`Added ${newName}`);
			setTimeout(() => setMessage(null), 3000);
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const person = persons.find((person) => newName === person.name);

		if (person) {
			window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			) && updatePerson(person.id);
		} else if (!person) {
			createPerson();
		}

		setNewName('');
		setNewNumber('');
	};

	const handleDelete = (event, id, name) => {
		if (parseInt(event.target.id) === id) {
			const changedPerson = persons.filter((person) => id !== person.id);
			const confirmDeletion = window.confirm(`Delete ${name} ?`);

			if (confirmDeletion) {
				personService.remove(id).catch((error) => {
					setMessage(
						`Information of ${name} has already been removed from server`
					);
					setTimeout(() => setMessage(null), 3000);
				});
				setPersons(changedPerson);
				setMessage(`Deleted ${name}`);
				setTimeout(() => setMessage(null), 3000);
			}
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
			<Filter
				searchVal={searchVal}
				handleSearchValChange={handleSearchValChange}
			/>

			<h2>add a new</h2>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
				handleNameChange={handleNameChange}
				handleSubmit={handleSubmit}
			/>

			<h2>Numbers</h2>
			{filterdNames.map((person) => {
				return (
					<Person
						key={person.name}
						person={person}
						handleDelete={handleDelete}
					/>
				);
			})}
		</div>
	);
};

export default App;
