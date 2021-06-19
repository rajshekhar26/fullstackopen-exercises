import React from 'react';

const Person = ({ person, handleDelete }) => (
	<div>
		{person.name} {person.number}{' '}
		<button
			id={person.id}
			onClick={(e) => handleDelete(e, person.id, person.name)}
		>
			delete
		</button>
	</div>
);

export default Person;
