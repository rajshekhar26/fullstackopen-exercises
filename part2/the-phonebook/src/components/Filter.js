import React from 'react';

const Filter = ({ searchVal, handleSearchValChange }) => {
	return (
		<label>
			filter shown with:{' '}
			<input onChange={handleSearchValChange} value={searchVal} />
		</label>
	);
};

export default Filter;
