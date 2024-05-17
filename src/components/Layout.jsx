import React from 'react';
import Navbar from './Navbar';
import Main from './Main';
import Box from './Box';
import { useMovies } from '../context/MoviesContext';
import MovieList from './MovieList';
import Error from './Error';
import Loader from './Loader';
import MovieDetails from './MovieDetails';
import WatchedSummary from './WatchedSummary';
import WatchedMovieList from './WatchedMovieList';

function Layout() {
  const { error, isLoading, selectedId } = useMovies();
  return (
    <>
      <Navbar />
      <Main>
        <Box>{error ? <Error message={error} /> : !error && isLoading ? <Loader /> : <MovieList />}</Box>
        <Box>
          {selectedId ? (
            <MovieDetails />
          ) : (
            <>
              <WatchedSummary />
              <WatchedMovieList />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default Layout;
