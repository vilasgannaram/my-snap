import React from 'react';

import './spinner.scss';

const Spinner = () => {
	return (
		<div className='spinner'>
			<div className='spinner-dot'></div>
			<div className='spinner-dot'></div>
			<div className='spinner-dot'></div>
			<div className='spinner-dot'></div>
			<div className='spinner-dot'></div>
			<div className='spinner-dot'></div>
		</div>
	);
};

export default Spinner;
