import React from 'react';
import type { Movie } from '../../types/Movie';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const posterUrl = movie.poster_path 
    ? `${posterBaseUrl}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image"; // Afiş yoksa varsayılan resim

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out group">
        <img 
          src={posterUrl} 
          alt={`${movie.title} afişi`}
          className="w-full h-auto object-cover"
        />
        <div className="p-4">
          {/* truncate: Başlık çok uzunsa sonuna ... koyar */}
          <h3 className="text-lg font-semibold truncate group-hover:text-blue-400 transition-colors">{movie.title}</h3>
          <p className="text-slate-400 mt-1">Puan: {movie.vote_average.toFixed(1)}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;