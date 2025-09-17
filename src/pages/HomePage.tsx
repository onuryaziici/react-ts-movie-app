import React from 'react';
import MovieCard from '../components/MovieCard/MovieCard';

const HomePage: React.FC = () => {
  return (
    <div>
      <h2>Popüler Filmler</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* Şimdilik statik olarak birkaç MovieCard ekleyelim */}
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
};

export default HomePage;