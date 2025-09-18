import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard/MovieCard';
import apiClient from '../services/api';
import type { Movie, MovieListResponse } from '../types/Movie';

const HomePage: React.FC = () => {
  // Gelen filmleri saklamak için bir state oluşturuyoruz.
  // Başlangıç değeri boş bir dizi ve tipini Movie dizisi olarak belirtiyoruz.
  const [movies, setMovies] = useState<Movie[]>([]);

  // Component ekrana ilk yüklendiğinde çalışacak olan effect.
  useEffect(() => {
    // API'den veri çekmek için asenkron bir fonksiyon tanımlıyoruz.
    const fetchPopularMovies = async () => {
      try {
        const response = await apiClient.get<MovieListResponse>('/movie/popular');
        setMovies(response.data.results);
      } catch (error) {
        console.error("Film verisi çekerken hata oluştu:", error);
      }
    };

    fetchPopularMovies();
  }, []); // Boş dependency array, bu effect'in sadece bir kez çalışmasını sağlar.

  return (
    <div>
      <h2>Popüler Filmler</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* movies state'indeki her bir film için bir MovieCard render ediyoruz. */}
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;