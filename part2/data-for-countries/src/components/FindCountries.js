import React from 'react';

const FindCountries = ({ handleSearchChange, searchedVal }) => {
	return (
		<label>
			find countries
			<input onChange={handleSearchChange} value={searchedVal} />
		</label>
	);
};

export default FindCountries;
