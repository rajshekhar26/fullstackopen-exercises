import React from 'react';

const PersonForm = (props) => {
	const {
		newName,
		newNumber,
		handleNameChange,
		handleNumberChange,
		handleSubmit,
	} = props;

	return (
		<form onSubmit={handleSubmit}>
			<div>
				name: <input onChange={handleNameChange} value={newName} required />
			</div>
			<div>
				number:{' '}
				<input onChange={handleNumberChange} value={newNumber} required />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default PersonForm;
