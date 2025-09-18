// src/pages/MovieDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../services/api';
import type { MovieDetails } from '../types/Movie';

const MovieDetailPage: React.FC = () => {
  // URL'deki dinamik parametreyi (ör: /movie/123 ise 123'ü) almak için useParams kullanılır.
  const { id } = useParams<{ id: string }>(); 
  
  // Film detaylarını saklamak için state
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Component yüklendiğinde veya 'id' değiştiğinde çalışacak olan effect
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return; // id yoksa fonksiyondan çık

      try {
        setLoading(true);
        const response = await apiClient.get<MovieDetails>(`/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Film detayı çekilirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]); // Bu effect 'id'ye bağımlıdır.

  // Yüklenme durumu
  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  // Film bulunamazsa
  if (!movie) {
    return <div>Film bulunamadı.</div>;
  }
  
  const posterBaseUrl = 'https://image.tmdb.org/t/p/w500';

  // Film verisi varsa render edilecek JSX
  return (
    <div style={{ padding: '2rem' }}>
      <img 
        src={`${posterBaseUrl}${movie.poster_path}`} 
        alt={`${movie.title} afişi`}
        style={{ maxWidth: '400px', float: 'left', marginRight: '2rem' }}
      />
      <h1>{movie.title}</h1>
      <p><em>{movie.tagline}</em></p>
      <h3>Özet</h3>
      <p>{movie.overview}</p>
      <p><strong>Puan:</strong> {movie.vote_average.toFixed(1)} / 10</p>
      <p><strong>Süre:</strong> {movie.runtime} dakika</p>
      <div>
        <strong>Türler:</strong>
        {movie.genres.map(genre => genre.name).join(', ')}
      </div>
    </div>
  );
};

export default MovieDetailPage;