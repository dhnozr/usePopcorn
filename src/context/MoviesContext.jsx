import { createContext, useContext, useEffect, useReducer } from 'react';

// API key for the OMDB API
const KEY = '36c52d5d';

// Creating a Context for the Movies data
const MoviesContext = createContext();

// Initial state for the Movies context
const initialState = {
  movies: [], // Array to hold movie data
  isLoading: false, // Loading state to show a spinner or loading indicator
  error: '', // Error message for fetching data
  query: '', // Search query string
};

// Reducer function to handle actions and update state accordingly
const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'error':
      return { ...state, isLoading: false, error: action.payload };
    case 'dataReceived':
      return { ...state, isLoading: false, movies: action.payload };
    case 'noQuery':
      return { ...initialState }; // Reset to initial state when no query is present
    case 'querySearch':
      return { ...state, query: action.payload }; // Update the search query
    default:
      return state;
  }
};

// Provider component to encapsulate state logic and provide context to child components
function MoviesProvider({ children }) {
  const [{ movies, isLoading, error, query }, dispatch] = useReducer(reducer, initialState);

  // Effect to fetch movies based on search query
  useEffect(() => {
    const controller = new AbortController(); // Controller to abort fetch request
    const fetchMovies = async () => {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });
        const data = await res.json();
        if (data.Response === 'False') throw new Error('Movie not Found!');
        dispatch({ type: 'dataReceived', payload: data.Search });
      } catch (error) {
        if (error.name !== 'AbortError') {
          dispatch({ type: 'error', payload: error.message });
        }
      }
    };

    if (!query.length) {
      dispatch({ type: 'noQuery' });
    } else {
      fetchMovies();
    }
    return () => controller.abort(); // Cleanup function to abort fetch when component unmounts or query changes
  }, [query]);

  // Provide context values to children
  return (
    <MoviesContext.Provider
      value={{
        movies,
        query,
        dispatch,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

// Custom hook to use the Movies context
function useMovies() {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
}

export { useMovies, MoviesProvider };