import React from 'react';
import { useMovies } from '../context/MoviesContext';

function Navbar() {
  return (
    <nav className='nav-bar'>
      <Logo />
      <Search />
      <NumOfResults />
    </nav>
  );
}

function Logo() {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search() {
  const { query, dispatch } = useMovies();
  return (
    <input
      type='text'
      className='search'
      placeholder='Search Movies...'
      value={query}
      onChange={e => dispatch({ type: 'querySearch', payload: e.target.value })}
    />
  );
}

function NumOfResults() {
  const { movies } = useMovies();
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export default Navbar;
