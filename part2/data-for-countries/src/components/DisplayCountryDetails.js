import React from 'react';

const DisplayCountryDetails = ({ country }) => {
	return (
		<div>
			<h1>{country.name}</h1>
			<div>capital {country.capital}</div>
			<div>population {country.population}</div>
			<h2>languages</h2>
			<ul>
				{country.languages.map((language) => {
					return <li key={language.name}>{language.name}</li>;
				})}
			</ul>
			<img src={country.flag} alt="flag" width="100px" />
		</div>
	);
};

export default DisplayCountryDetails;
