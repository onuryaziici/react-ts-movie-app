import React from 'react';
import type { Movie } from '../../types/Movie'; // Movie tipini import ediyoruz

// Component'in alacağı props'ların tipini tanımlıyoruz.
interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  // TMDB'den gelen poster_path sadece dosya adını verir.
  // Tam URL'yi bizim oluşturmamız gerekir.
  const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem', width: '200px' }}>
      <img 
        src={`${posterBaseUrl}${movie.poster_path}`} 
        alt={`${movie.title} afişi`}
        style={{ width: '100%' }} 
      />
      <h3>{movie.title}</h3>
      <p>Puan: {movie.vote_average.toFixed(1)}</p> {/* Puanı tek ondalıklı göster */}
    </div>
  );
};

export default MovieCard;