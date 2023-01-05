import React, { useState } from 'react';

import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import './root.scss';

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchWord, setSearchWord] = useState('');
  const [showHeader, setShowHeader] = useState(true);

  const inputChangeHandler = (e) => {
    setSearchWord(e.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!searchWord) return;
    setSearchWord('');
    navigate(`search/photos/${searchWord}`);
  };

  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (lastScrollY < window.scrollY) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    lastScrollY = window.scrollY;
  });

  return (
    <>
      <header className={`header-container ${showHeader ? 'show-header' : ''}`}>
        <nav className='primary-navigation-container'>
          <Link to='/' className='logo-container'>
            <img className='logo' src={logo} alt='logo' />
          </Link>

          <form
            onSubmit={formSubmitHandler}
            className='primary-navigation-form'
          >
            <input
              type='text'
              name='search'
              onChange={inputChangeHandler}
              value={searchWord}
              placeholder='search for high resolution photos...	'
            />
            <button type='submit' className='material-symbols-outlined'>
              search
            </button>
          </form>
        </nav>
      </header>

      <main className='main-container'>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
