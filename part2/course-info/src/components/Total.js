import React from 'react';

const Total = ({ parts }) => {
	const sum = parts.reduce((acc, val) => acc + val.exercises, 0);
	return <p style={{ fontWeight: 'bold' }}>total of {sum} exercises</p>;
};

export default Total;
