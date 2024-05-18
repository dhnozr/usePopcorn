import React, { useEffect, useState } from 'react';
import { useMovies } from '../context/MoviesContext';
import Loader from './Loader';
import StarRating from './StarRating';

function MovieDetails() {
  const { isLoading, selectedMovie: movie, dispatch, selectedId, watchedMovies } = useMovies();
  const [userRating, setUserRating] = useState(0);

  const isMovieAlreadyRated = watchedMovies.find(movie => movie.imdbID === selectedId);
  const rated = isMovieAlreadyRated?.userRating;

  useEffect(() => {
    if (movie.Title) {
      document.title = `Show ${movie.Title}`;

      return () => (document.title = 'usePopcorn');
    }
  }, [movie.Title]);
  const newMovie = {
    imdbID: selectedId,
    Title: movie.Title,
    Year: movie.Year,
    Poster: movie.Poster,
    imdbRating: Number(movie.imdbRating),
    Runtime: Number(movie.Runtime?.split(' ').at(0)),
    userRating,
  };

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button onClick={() => dispatch({ type: 'closeMovie' })} className='btn-back'>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
            <div className='details-overview'>
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className='rating'>
              {isMovieAlreadyRated ? (
                <p>
                  You rated this movie as {rated} <span>⭐</span>{' '}
                </p>
              ) : (
                <StarRating onRate={setUserRating} />
              )}

              {userRating > 0 && (
                <button className='btn-add' onClick={() => dispatch({ type: 'addToList', payload: newMovie })}>
                  + Add to list
                </button>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
