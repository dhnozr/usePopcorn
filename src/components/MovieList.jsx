import React from 'react';
import { useMovies } from '../context/MoviesContext';

function MovieList() {
  const { movies } = useMovies();
  return (
    <ul className='list list-movies'>
      {movies?.map(movie => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  const { dispatch } = useMovies();
  return (
    <li key={movie.imdbID} onClick={() => dispatch({ type: 'selectedId', payload: movie.imdbID })}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default MovieList;
