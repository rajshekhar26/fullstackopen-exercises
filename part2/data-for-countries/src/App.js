import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FindCountries from './components/FindCountries';
import DisplayCountries from './components/DisplayCountries';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [searchedVal, setSearchedVal] = useState('');

	useEffect(() => {
		axios.get('http://restcountries.eu/rest/v2/all').then((response) => {
			const countries = response.data;
			setCountries(countries);
		});
	}, []);

	const handleSearchChange = (event) => {
		setSearchedVal(event.target.value);
	};

	return (
		<div>
			<FindCountries
				handleSearchChange={handleSearchChange}
				searchedVal={searchedVal}
			/>
			<DisplayCountries countries={countries} searchedVal={searchedVal} />
		</div>
	);
};

export default App;
