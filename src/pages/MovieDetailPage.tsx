import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../services/api';
import type { Movie, MovieDetails } from '../types/Movie';

interface MovieDetailPageProps {
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

const MovieDetailPage: React.FC<MovieDetailPageProps> = ({ addFavorite, removeFavorite, isFavorite }) => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await apiClient.get<MovieDetails>(`/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Film detayı çekilirken hata oluştu:", error);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-slate-400 text-lg">Yükleniyor...</div>;
  }

  if (!movie) {
    return <div className="text-center text-slate-400 text-lg">Film bulunamadı.</div>;
  }

  const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';
  const movieIsFavorite = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    if (movieIsFavorite) {
      removeFavorite(movie.id);
    } else {
      const movieToAdd: Movie = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        overview: movie.overview,
      };
      addFavorite(movieToAdd);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3 flex-shrink-0">
        <img 
          src={`${posterBaseUrl}${movie.poster_path}`} 
          alt={movie.title} 
          className="w-full h-auto rounded-lg shadow-lg" 
        />
      </div>
      <div className="md:w-2/3">
        <h2 className="text-4xl font-bold">{movie.title}</h2>
        {movie.tagline && <p className="text-slate-400 italic mt-2">"{movie.tagline}"</p>}
        
        <div className="flex items-center gap-4 my-4 text-slate-300">
          <span className="font-semibold">Puan: {movie.vote_average.toFixed(1)}</span>
          <span className="text-slate-500">|</span>
          <span className="font-semibold">Süre: {movie.runtime} dakika</span>
        </div>

        {/* --- DÜZELTME BURADA --- */}
        <button 
          onClick={handleFavoriteClick} 
          className={`
            mt-4 px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 
            transform hover:scale-105 shadow-lg
            ${
              movieIsFavorite 
                // Film favorilerdeyse: Kırmızı arka plan
                ? 'bg-red-600 hover:bg-red-700 shadow-red-500/50' 
                // Film favorilerde değilse: Mavi arka plan
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/50'
            }
          `}
        >
          {movieIsFavorite ? 'Favorilerden Çıkar' : 'Favorilerden Ekle'}
        </button>

        <h3 className="text-2xl font-semibold mt-8 border-b-2 border-slate-700 pb-2">Özet</h3>
        <p className="text-slate-300 mt-4 leading-relaxed">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetailPage;