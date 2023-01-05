import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import {
  Root,
  Home,
  Search,
  SearchPhotos,
  User,
  UserPhotos,
  UserLikes,
  UserCollections,
} from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Home />} />

      <Route path='search' element={<Search />}>
        <Route index path='photos/:photo' element={<SearchPhotos />} />
      </Route>

      <Route path=':username' element={<User />}>
        <Route index element={<UserPhotos />} />
        <Route path='likes' element={<UserLikes />} />
        <Route path='collections' element={<UserCollections />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
