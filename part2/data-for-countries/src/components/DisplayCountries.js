import React from 'react';
import DisplayCountryNames from './DisplayCountryNames';
import DisplayCountryDetails from './DisplayCountryDetails';

const DisplayCountries = ({ countries, searchedVal }) => {
	const filterCountries = countries.filter((country) => {
		return country.name.toLowerCase().includes(searchedVal.toLowerCase());
	});

	if (filterCountries.length > 10) {
		return <div>Too many matches, specify another filter</div>;
	} else if (filterCountries.length === 1) {
		return <DisplayCountryDetails country={filterCountries[0]} />;
	} else if (filterCountries.length >= 1 && filterCountries.length <= 10) {
		return <DisplayCountryNames countries={filterCountries} />;
	} else {
		return null;
	}
};

export default DisplayCountries;
