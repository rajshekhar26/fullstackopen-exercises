import React from 'react';

const DisplayCountryNames = ({ countries }) => {
	return countries.map((country) => {
		return <div key={country.name}>{country.name} </div>;
	});
};

export default DisplayCountryNames;
