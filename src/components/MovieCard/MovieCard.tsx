import React from 'react';

// Şimdilik props almıyor, daha sonra film verilerini prop olarak alacak.
const MovieCard: React.FC = () => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem', width: '200px' }}>
      <img 
        src="https://via.placeholder.com/200x300" 
        alt="Film Afişi" 
        style={{ width: '100%' }} 
      />
      <h3>Film Başlığı</h3>
      <p>Puan: 8.5</p>
    </div>
  );
};

export default MovieCard;