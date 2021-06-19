import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((part, index) => (
				<Part part={part} key={index} />
			))}
		</div>
	);
};

export default Content;
