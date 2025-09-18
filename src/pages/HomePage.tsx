import React, { useEffect, useState, useCallback } from 'react';
import MovieCard from '../components/MovieCard/MovieCard';
import apiClient from '../services/api';
import { useDebounce } from '../hooks/useDebounce';
import type { Movie, MovieListResponse } from '../types/Movie';

interface HomePageProps {
  searchTerm: string;
}

const HomePage: React.FC<HomePageProps> = ({ searchTerm }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchMovies = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const endpoint = query ? '/search/movie' : '/movie/popular';
      const params = query ? { query } : {};
      
      const response = await apiClient.get<MovieListResponse>(endpoint, { params });
      
      setMovies(response.data.results);
    } catch (error) {
      console.error("Film verisi çekerken hata oluştu:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchMovies]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-slate-300">
        {debouncedSearchTerm
          ? `"${debouncedSearchTerm}" için sonuçlar`
          : 'Popüler Filmler'}
      </h2>
      
      {loading ? (
        <p className="text-center text-slate-400 text-lg">Yükleniyor...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p className="col-span-full text-center text-slate-400 text-lg">
              Aramanızla eşleşen bir film bulunamadı.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;