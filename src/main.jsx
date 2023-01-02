import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';

import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from 'react-router-dom';

import { Root, Home, Search, SearchPhotos } from './pages';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Root />}>
			<Route index element={<Home />} />

			<Route path='search' element={<Search />}>
				<Route index path='photos/:photo' element={<SearchPhotos />} />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
