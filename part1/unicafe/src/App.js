import React, { useState } from 'react';

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => {
	return (
		<tr>
			<td> {text}</td>
			<td>{value}</td>
		</tr>
	);
};

const Statistics = ({ good, neutral, bad }) => {
	const all = good + neutral + bad;

	if (!all) {
		return <div>No feedback given</div>;
	}

	return (
		<table>
			<tbody>
				<Statistic text="good" value={good} />
				<Statistic text="neutral" value={neutral} />
				<Statistic text="bad" value={bad} />
				<tr>
					<td>all</td>
					<td>{all}</td>
				</tr>
				<tr>
					<td>average</td>
					<td>{(good * 1 + bad * -1) / all}</td>
				</tr>
				<tr>
					<td>positive</td>
					<td>{(good * 100) / all}%</td>
				</tr>
			</tbody>
		</table>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleClickGood = () => {
		setGood(good + 1);
	};

	const handleClickNeutral = () => {
		setNeutral(neutral + 1);
	};

	const handleClickBad = () => {
		setBad(bad + 1);
	};

	return (
		<div>
			<h2>give feedback</h2>
			<Button handleClick={handleClickGood} text="good" />
			<Button handleClick={handleClickNeutral} text="neutral" />
			<Button handleClick={handleClickBad} text="bad" />
			<h2>statistics</h2>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
