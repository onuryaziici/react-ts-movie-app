import React from 'react';
import type { Movie } from '../../types/Movie';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    // Tüm kartı bir Link ile sarmala
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem', width: '200px' }}>
        <img 
          src={`${posterBaseUrl}${movie.poster_path}`} 
          alt={`${movie.title} afişi`}
          style={{ width: '100%' }} 
        />
        <h3>{movie.title}</h3>
        <p>Puan: {movie.vote_average.toFixed(1)}</p>
      </div>
    </Link>
  );
};

export default MovieCard;