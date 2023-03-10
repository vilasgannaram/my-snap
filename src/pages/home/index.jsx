import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Photos from './photos';
import './index.scss';

const Home = () => {
	const navigate = useNavigate();
	const [searchWord, setSearchWord] = useState('');

	const searchInputChangeHandler = (e) => {
		setSearchWord(e.target.value);
	};

	const formSubmitHandler = (e) => {
		e.preventDefault();

		if (!searchWord) return;
		navigate(`search/photos/${searchWord}`);
	};

	return (
		<section className='home-container'>
			<div className='home-search-container'>
				<div className='home-search-wrapper'>
					<div className='home-search-text-container'>
						<h2 className='home-header'>
							My Snap <span className='home-header-emoji'>🙂</span>
						</h2>
						<p className='home-description'>
							The best and high resolution photos shared by creators across the
							world.
						</p>
					</div>
					<form
						onSubmit={formSubmitHandler}
						className='home-search-form-container'
					>
						<input
							type='text'
							value={searchWord}
							onChange={searchInputChangeHandler}
							placeholder='Search for high resolution photos...'
						/>
						<button type='submit' className='material-symbols-outlined'>
							search
						</button>
					</form>
				</div>

				<div className='home-search-author-container'>
					<a
						target='_blank'
						href='https://www.linkedin.com/in/vilasgannaram/'
						className='home-search-author'
					>
						created by <span className='author'>vilas 👋</span>
					</a>
				</div>
			</div>

			<Photos />
		</section>
	);
};

export default Home;
