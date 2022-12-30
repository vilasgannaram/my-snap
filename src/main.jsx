import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from 'react-router-dom';

// import { OptimizedPhoto } from './components';
import { Root, Home, Search, SearchPhotos } from './routes';

// import data from '../photo.json';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Root />}>
			{/* <Route index element={<OptimizedPhoto image={data} />} /> */}
			<Route index element={<Home />} />

			<Route path='s/photos/:photo' element={<Search />}>
				<Route index element={<SearchPhotos />} />
			</Route>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
