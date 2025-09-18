import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import Navbar from './components/Navbar/Navbar';
import type { Movie } from './types/Movie';

function App() {
  // --- State Yönetimi ---

  // 1. Arama terimi için state
  const [searchTerm, setSearchTerm] = useState('');
  
  // 2. Favori filmleri tutacak state
  // Uygulama ilk açıldığında localStorage'daki favorileri yükler.
  // Bu "lazy initial state" yöntemidir, localStorage'a sadece ilk render'da bakar.
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Favoriler localStorage'dan okunurken hata oluştu:", error);
      return [];
    }
  });

  // --- Effect'ler ---

  // 'favorites' state'i her değiştiğinde bu effect çalışır ve localStorage'ı günceller.
  // Bu, favori listesinin kalıcı olmasını sağlar.
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Favoriler localStorage'a yazılırken hata oluştu:", error);
    }
  }, [favorites]);

  // --- Yardımcı Fonksiyonlar ---

  // Favorilere yeni bir film ekler.
  const addFavorite = (movie: Movie) => {
    // Aynı filmin tekrar eklenmesini önlemek için kontrol
    if (!favorites.some(fav => fav.id === movie.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, movie]);
    }
  };

  // Favorilerden bir filmi ID'sine göre çıkarır.
  const removeFavorite = (movieId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== movieId)
    );
  };

  // Bir filmin favorilerde olup olmadığını ID'sine göre kontrol eder.
  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  // --- Render (JSX) ---

  return (
    // Tailwind CSS ile ana layout
    // `min-h-screen` tüm ekran yüksekliğini kaplamasını sağlar.
    // Arka plan rengi global olarak index.css'te ayarlanmıştır.
    <div className="min-h-screen"> 
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {/* 
        `container` ve `mx-auto`: İçeriği ortalar ve genişliğini sınırlar.
        `p-4 md:p-8`: Farklı ekran boyutları için responsive padding.
      */}
      <main className="container container mx-auto py-8 px-4 sm:px-32">
        <Routes>
          <Route 
            path="/" 
            element={<HomePage searchTerm={searchTerm} />} 
          />
          <Route 
            path="/movie/:id" 
            element={
              <MovieDetailPage 
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                isFavorite={isFavorite}
              />
            } 
          />
          {/* Gelecekte bir favoriler sayfası eklemek isterseniz rotası hazır: */}
          {/* <Route path="/favorites" element={<FavoritesPage favorites={favorites} />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;