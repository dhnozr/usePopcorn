import React from 'react';
import Navbar from './Navbar';
import Main from './Main';
import Box from './Box';
import { useMovies } from '../context/MoviesContext';
import MovieList from './MovieList';
import Error from './Error';
import Loader from './Loader';

function Layout() {
  const { error, isLoading } = useMovies();
  return (
    <>
      <Navbar />
      <Main>
        <Box>{error ? <Error message={error} /> : !error && isLoading ? <Loader /> : <MovieList />}</Box>
        <Box></Box>
      </Main>
    </>
  );
}

export default Layout;
