import Layout from './components/Layout/Layout';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Navbar /> 
      <main style={{ padding: '1rem' }}>
        <HomePage />
      </main>
    </>
  );
}

export default App;