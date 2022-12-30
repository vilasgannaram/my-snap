import React from 'react';

import { Link, Outlet } from 'react-router-dom';
import './root.scss';

import logo from '../../assets/logo.svg';

const Root = () => {
	return (
		<>
			<header className='header'>
				<Link to={'/'} className='logo-container'>
					<img className='logo' src={logo} alt='logo' />
				</Link>
				{/* <nav>Navbar</nav> */}
			</header>

			<main className='main'>
				<Outlet />
			</main>
		</>
	);
};

export default Root;
