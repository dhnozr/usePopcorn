import React from 'react';
import { useMovies } from '../context/MoviesContext';

function WatchedMovieList() {
  const { watchedMovies: watched } = useMovies();
  return (
    <ul className='list'>
      {watched.map(movie => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

const WatchedMovie = ({ movie }) => {
  const { dispatch } = useMovies();
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime} min</span>
        </p>
        <button onClick={() => dispatch({ type: 'removeFromTheList', payload: movie.imdbID })} className='btn-delete'>
          X
        </button>
      </div>
    </li>
  );
};

export default WatchedMovieList;
