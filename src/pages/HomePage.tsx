import React, { useEffect, useState, useCallback } from 'react';
import MovieCard from '../components/MovieCard/MovieCard';
import apiClient from '../services/api';
import { useDebounce } from '../hooks/useDebounce';
import type { Movie, MovieListResponse } from '../types/Movie';

// 1. Gelen prop'ların tipini tanımlıyoruz.
// Artık bu component, arama terimini App.tsx'den alacak.
interface HomePageProps {
  searchTerm: string;
}

const HomePage: React.FC<HomePageProps> = ({ searchTerm }) => {
  // 2. State'ler
  // Bu component sadece filmlerin listesini kendi içinde yönetiyor.
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  // 3. Debounce Hook'u
  // Kullanıcı yazmayı bıraktıktan 500ms sonra arama terimini günceller.
  // Bu, her tuş vuruşunda API'ye istek gönderilmesini engeller.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 4. API'den veri çeken fonksiyon
  // useCallback ile bu fonksiyonun gereksiz yere yeniden oluşturulmasını engelliyoruz.
  const fetchMovies = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const endpoint = query ? '/search/movie' : '/movie/popular';
      const params = query ? { query } : {};
      
      const response = await apiClient.get<MovieListResponse>(endpoint, { params });
      
      setMovies(response.data.results);
    } catch (error) {
      console.error("Film verisi çekerken hata oluştu:", error);
      // Hata durumunda film listesini boşaltmak iyi bir pratiktir.
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []); // Bağımlılık dizisi boş, çünkü fonksiyon dışarıdan bir şeye bağlı değil.

  // 5. useEffect Hook'u
  // debouncedSearchTerm her değiştiğinde (yani kullanıcı arama yaptığında)
  // veya component ilk yüklendiğinde fetchMovies fonksiyonunu çalıştırır.
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchMovies]);

  // 6. Render (JSX)
  return (
    <div>
      <h2>
        {debouncedSearchTerm
          ? `"${debouncedSearchTerm}" için sonuçlar`
          : 'Popüler Filmler'}
      </h2>
      
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>Aramanızla eşleşen bir film bulunamadı.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;