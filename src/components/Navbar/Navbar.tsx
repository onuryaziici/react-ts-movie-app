import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="bg-slate-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* 1. Sol Sütun (Dengeleyici Boşluk) */}
        <div className="flex-1">
          {/* İsterseniz buraya "Favoriler" gibi bir link ekleyebilirsiniz */}
        </div>

        {/* 2. Orta Sütun (Ortalanmış Başlık) */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
            MovieApp
          </Link>
        </div>

        {/* 3. Sağ Sütun (Arama Kutusu) */}
        <div className="flex-1 flex justify-end">
          <input 
            type="text" 
            placeholder="Film ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xs bg-slate-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;