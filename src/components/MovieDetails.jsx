import React, { useEffect } from 'react';
import { useMovies } from '../context/MoviesContext';
import Loader from './Loader';

function MovieDetails() {
  const { isLoading, selectedMovie: movie, dispatch, selectedId } = useMovies();

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
                {movie.imdbRating}IMDb rating
              </p>
            </div>
          </header>

          <section>
            <button className='btn-add' onClick={() => dispatch({ type: 'addToList', payload: newMovie })}>
              + Add to list
            </button>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
