import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav style={{ background: '#333', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        <h1>MovieApp</h1>
      </Link>
      <input 
        type="text" 
        placeholder="Film ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '0.5rem' }}
      />
    </nav>
  );
};

export default Navbar;