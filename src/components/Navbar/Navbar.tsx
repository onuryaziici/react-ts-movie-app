import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav style={{ background: '#333', color: 'white', padding: '1rem' }}>
      <h1>MovieApp</h1>
      <input type="text" placeholder="Film ara..." />
    </nav>
  );
};

export default Navbar;