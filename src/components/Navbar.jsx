import React from 'react';

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
  return <input type='text' className='search' placeholder='Search Movies...' />;
}

function NumOfResults() {
  return (
    <p className='num-results'>
      Found <strong>x</strong>results
    </p>
  );
}

export default Navbar;
