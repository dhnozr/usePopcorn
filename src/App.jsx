import { MoviesProvider } from './context/MoviesContext';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <MoviesProvider>
        <Layout />
      </MoviesProvider>
    </>
  );
}

export default App;
