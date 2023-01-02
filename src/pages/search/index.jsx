import React from 'react';

import { Outlet, useParams } from 'react-router-dom';
import './search.scss';

const Search = () => {
	const { photo } = useParams();

	return (
		<div className='search-container'>
			<div className='search-text-container'>
				<p className='search-results-text'>
					Search results for: <span className='search-result'>{photo}</span>
				</p>
			</div>

			<Outlet />
		</div>
	);
};

export default Search;
